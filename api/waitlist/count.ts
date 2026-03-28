import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../../lib/supabase.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { count } = await supabase
      .from("waitlist_entries")
      .select("*", { count: "exact", head: true });

    return res.json({ count: count ?? 0 });
  } catch (err) {
    console.error("Failed to get waitlist count:", err);
    return res.status(500).json({ count: 0 });
  }
}
