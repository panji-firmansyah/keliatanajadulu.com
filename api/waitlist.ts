import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../lib/supabase.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body ?? {};

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(422).json({
      success: false,
      message: "Email kamu kurang bener nih, coba cek lagi.",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const ipAddress =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      null;

    const { error } = await supabase
      .from("waitlist_entries")
      .insert({ email: normalizedEmail, ip_address: ipAddress });

    if (error) {
      if (error.code === "23505") {
        return res.status(409).json({
          success: false,
          message: "Email ini udah ada di list kita. Mantap, kamu cepet! 🎉",
        });
      }
      throw error;
    }

    const { count } = await supabase
      .from("waitlist_entries")
      .select("*", { count: "exact", head: true });

    return res.status(201).json({
      success: true,
      message: "Mantap! Kamu udah di list.",
      position: count ?? 0,
    });
  } catch (err) {
    console.error("Failed to join waitlist:", err);
    return res.status(500).json({
      success: false,
      message: "Ups, ada yang ga beres. Coba lagi ya.",
    });
  }
}
