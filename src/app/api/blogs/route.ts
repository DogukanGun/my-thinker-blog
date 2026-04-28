import { NextResponse } from "next/server";

// Serverless-friendly: open a fresh client per request, close on the way out.
// pg.Pool kept connections open across function instances and saturated the
// Supabase Transaction-mode pooler, which manifested as ECHECKOUTTIMEOUT
// after Vercel's 15s function timeout.
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured" },
      { status: 503 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Client } = require("pg") as typeof import("pg");
  const client = new Client({
    connectionString: url,
    ssl:
      url.includes("localhost") || url.includes("127.0.0.1")
        ? false
        : { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const result = await client.query(
      "SELECT * FROM blogs ORDER BY created_at DESC"
    );
    return NextResponse.json({ blogs: result.rows });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[/api/blogs] DB error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await client.end().catch(() => {});
  }
}
