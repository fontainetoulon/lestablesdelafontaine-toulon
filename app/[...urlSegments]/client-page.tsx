"use client";

import { useTina } from "tinacms/dist/react";
import { RenderBlocks } from "@/components/RenderBlocks";
import ErrorBoundary from "@/components/error-boundary";

type Props = {
  data: any;
  query: string;
  variables: Record<string, unknown>;
};

export default function ClientPage(props: Props) {
  // ⚠️ Rendre `data` retourné par useTina, JAMAIS props.data —
  // sinon l'aperçu ne se met pas à jour pendant la frappe.
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <ErrorBoundary>
      <RenderBlocks blocks={data?.page?.blocks} />
    </ErrorBoundary>
  );
}
