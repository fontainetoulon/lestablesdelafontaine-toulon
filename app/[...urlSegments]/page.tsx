import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import client from "@/tina/__generated__/client";
import ClientPage from "./client-page";

export const revalidate = 300;

type Params = Promise<{ urlSegments: string[] }>;

async function getPage(params: Params) {
  const { urlSegments } = await params;
  const filepath = urlSegments.join("/");
  try {
    return await client.queries.page({ relativePath: `${filepath}.mdx` });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await getPage(params);
  if (!data) return {};
  return {
    title: data.data.page.title,
    description: data.data.page.description ?? undefined,
  };
}

export default async function Page({ params }: { params: Params }) {
  const data = await getPage(params);
  if (!data) notFound();
  return <ClientPage {...data} />;
}

export async function generateStaticParams() {
  let pages = await client.queries.pageConnection();
  const allPages = pages;

  if (!allPages.data.pageConnection.edges) {
    return [];
  }

  while (pages.data.pageConnection.pageInfo.hasNextPage) {
    pages = await client.queries.pageConnection({
      after: pages.data.pageConnection.pageInfo.endCursor,
    });

    if (!pages.data.pageConnection.edges) {
      break;
    }

    allPages.data.pageConnection.edges.push(...pages.data.pageConnection.edges);
  }

  return (allPages.data?.pageConnection.edges ?? [])
    .map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs || [],
    }))
    .filter((x) => x.urlSegments.length >= 1)
    .filter((x) => !x.urlSegments.every((segment) => segment === "home"));
}
