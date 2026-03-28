import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../db";
import { waitlistEntriesTable } from "../db/schema";
import { count } from "drizzle-orm";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Email kamu kurang bener nih, coba cek lagi."),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const parsed = emailSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({
      success: false,
      message: "Email kamu kurang bener nih, coba cek lagi.",
    });
  }

  const email = parsed.data.email.trim().toLowerCase();

  try {
    const ipAddress =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      null;

    await db.insert(waitlistEntriesTable).values({
      email,
      ipAddress: ipAddress ?? undefined,
    });

    const [{ value: totalCount }] = await db
      .select({ value: count() })
      .from(waitlistEntriesTable);

    return res.status(201).json({
      success: true,
      message: "Mantap! Kamu udah di list.",
      position: Number(totalCount),
    });
  } catch (err: unknown) {
    const isUniqueViolation = (e: unknown): boolean => {
      if (!e || typeof e !== "object") return false;
      const obj = e as Record<string, unknown>;
      if (obj["code"] === "23505") return true;
      if (obj["cause"] && isUniqueViolation(obj["cause"])) return true;
      return false;
    };

    if (isUniqueViolation(err)) {
      return res.status(409).json({
        success: false,
        message: "Email ini udah ada di list kita. Mantap, kamu cepet! 🎉",
      });
    }

    console.error("Failed to join waitlist:", err);
    return res.status(500).json({
      success: false,
      message: "Ups, ada yang ga beres. Coba lagi ya.",
    });
  }
}
