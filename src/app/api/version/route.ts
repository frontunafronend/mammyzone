import { NextResponse } from "next/server";
import { getDeployId } from "@/lib/deploy-id";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Uncached deploy stamp — used by the public site to drop stale mobile caches. */
export function GET() {
  return NextResponse.json(
    { id: getDeployId() },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      },
    },
  );
}
