import type { APIRoute, GetStaticPaths } from "astro";
import { getTrips } from "../../lib/content";

function getLegacySlug(legacyUrl?: string) {
  if (!legacyUrl?.startsWith("/gay-scuba-trips/") || !legacyUrl.endsWith(".html")) {
    return "";
  }

  return legacyUrl
    .replace(/^\/gay-scuba-trips\//, "")
    .replace(/\.html$/, "");
}

export const getStaticPaths: GetStaticPaths = async () => {
  const trips = await getTrips();

  return trips.flatMap((trip) => {
    const legacy = getLegacySlug(trip.legacyUrl);

    return legacy
      ? [
          {
            params: { legacy },
            props: { destination: trip.path },
          },
        ]
      : [];
  });
};

export const GET: APIRoute = ({ props }) => {
  const destination = String(props.destination || "/trips");
  const escapedDestination = destination
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  const scriptDestination = JSON.stringify(destination).replaceAll("<", "\\u003c");

  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0;url=${escapedDestination}">
    <link rel="canonical" href="${escapedDestination}">
    <title>Redirecting...</title>
    <script>window.location.replace(${scriptDestination});</script>
  </head>
  <body>
    <p>Redirecting to <a href="${escapedDestination}">${escapedDestination}</a>.</p>
  </body>
</html>`,
    {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
};
