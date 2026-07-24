import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from "payload";

async function triggerFrontendDeploy(req: PayloadRequest, source: string) {
  const deployHookURL = process.env.FRONTEND_DEPLOY_HOOK_URL;

  if (process.env.VERCEL_ENV !== "production" || !deployHookURL) {
    return;
  }

  try {
    const response = await fetch(deployHookURL, {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      req.payload.logger.error(
        `[frontend-deploy] Vercel deploy hook returned ${response.status} for ${source}`,
      );
      return;
    }

    req.payload.logger.info(`[frontend-deploy] Frontend rebuild requested by ${source}`);
  } catch (error) {
    req.payload.logger.error({
      err: error,
      msg: `[frontend-deploy] Could not request a frontend rebuild for ${source}`,
    });
  }
}

export const triggerFrontendDeployAfterChange: CollectionAfterChangeHook = async ({
  collection,
  operation,
  req,
}) => {
  await triggerFrontendDeploy(req, `${collection.slug}:${operation}`);
};

export const triggerFrontendDeployAfterDelete: CollectionAfterDeleteHook = async ({
  collection,
  req,
}) => {
  await triggerFrontendDeploy(req, `${collection.slug}:delete`);
};

export const triggerFrontendDeployAfterGlobalChange: GlobalAfterChangeHook = async ({
  global,
  req,
}) => {
  await triggerFrontendDeploy(req, `${global.slug}:update`);
};
