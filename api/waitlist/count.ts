import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../../db/index.js";
import { waitlistEntriesTable } from "../../db/schema/index.js";
import { count } from "drizzle-orm";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const [{ value }] = await db
      .select({ value: count() })
      .from(waitlistEntriesTable);

    return res.json({ count: Number(value) });
  } catch (err) {
    console.error("Failed to get waitlist count:", err);
    return res.status(500).json({ count: 0 });
  }
}
