import type { Metadata } from "next";

import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap.js";

type PageParams = {
  segments: string[];
};

type PageSearchParams = {
  [key: string]: string | string[];
};

type Args = {
  params: Promise<PageParams>;
  searchParams: Promise<PageSearchParams>;
};

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({
    config,
    params,
    searchParams,
  });

const Page = async ({ params, searchParams }: Args) =>
  RootPage({
    config,
    importMap,
    params,
    searchParams,
  });

export default Page;
