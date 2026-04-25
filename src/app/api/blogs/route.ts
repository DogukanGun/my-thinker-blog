import { NextResponse } from "next/server";

// Lazily initialise the pool so the module loads even without DATABASE_URL
let pool: import("pg").Pool | null = null;

function getPool() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;

  if (!pool) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Pool } = require("pg") as typeof import("pg");
    pool = new Pool({
      connectionString: url,
      // Disable SSL for local databases, require it for hosted ones
      ssl:
        url.includes("localhost") || url.includes("127.0.0.1")
          ? false
          : { rejectUnauthorized: false },
    });
  }
  return pool;
}

export async function GET() {
  const db = getPool();

  if (!db) {
    return NextResponse.json(
      { error: "DATABASE_URL is not configured" },
      { status: 503 }
    );
  }

  try {
    const result = await db.query(
      "SELECT * FROM blogs ORDER BY created_at DESC"
    );
    return NextResponse.json({ blogs: result.rows });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[/api/blogs] DB error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
