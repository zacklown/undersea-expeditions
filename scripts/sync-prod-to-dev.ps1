$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$productionEnv = Join-Path $repoRoot "apps/cms/.env.production.local"
$snapshotVolume = "undersea-expeditions-prod-snapshot"
$devDatabase = "undersea_payload"
$devUser = "undersea_cms"
$devPassword = "undersea_cms_dev_password"

if (-not (Test-Path -LiteralPath $productionEnv)) {
  throw "Missing $productionEnv"
}

$databaseLine = Get-Content -LiteralPath $productionEnv |
  Where-Object { $_ -match '^DATABASE_URL_UNPOOLED=' } |
  Select-Object -First 1

if (-not $databaseLine) {
  throw "DATABASE_URL_UNPOOLED is missing from $productionEnv"
}

$productionUrl = ($databaseLine -split '=', 2)[1].Trim('"')
$productionUri = [uri]$productionUrl

if ($productionUri.Host -match '^(localhost|127\.0\.0\.1|postgres)$') {
  throw "The production database URL resolved to a local host. Refusing to continue."
}

Push-Location $repoRoot

try {
  docker compose up -d postgres
  if ($LASTEXITCODE -ne 0) { throw "Could not start local Postgres." }

  docker compose stop frontend cms
  if ($LASTEXITCODE -ne 0) { throw "Could not stop the app containers." }

  docker volume create $snapshotVolume | Out-Null
  if ($LASTEXITCODE -ne 0) { throw "Could not create the temporary snapshot volume." }

  docker run --rm `
    --network undersea-expeditions_default `
    -e "PROD_DATABASE_URL=$productionUrl" `
    -v "${snapshotVolume}:/backup" `
    postgres:17-bookworm `
    pg_dump `
    --dbname=$productionUrl `
    --format=custom `
    --no-owner `
    --no-privileges `
    --file=/backup/production.dump
  if ($LASTEXITCODE -ne 0) { throw "Production snapshot failed. The dev database was not changed." }

  docker compose exec -T postgres dropdb --username=$devUser --if-exists $devDatabase
  if ($LASTEXITCODE -ne 0) { throw "Could not remove the dev database." }

  docker compose exec -T postgres createdb --username=$devUser --owner=$devUser $devDatabase
  if ($LASTEXITCODE -ne 0) { throw "Could not recreate the dev database." }

  docker run --rm `
    --network undersea-expeditions_default `
    -e "PGPASSWORD=$devPassword" `
    -v "${snapshotVolume}:/backup" `
    postgres:17-bookworm `
    pg_restore `
    --host=postgres `
    --username=$devUser `
    --dbname=$devDatabase `
    --no-owner `
    --no-privileges `
    --exit-on-error `
    /backup/production.dump
  if ($LASTEXITCODE -ne 0) { throw "Restoring the dev database failed." }

  docker compose up -d cms frontend
  if ($LASTEXITCODE -ne 0) { throw "The data restored, but the app containers did not restart." }

  Write-Output "The Docker development database now mirrors production."
}
finally {
  docker volume rm $snapshotVolume 2>$null | Out-Null
  Pop-Location
}
