import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { z } from "zod";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(255),
  password: z.string().min(6).max(100),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = schema.parse(body);
  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email))
    .limit(1);
  if (existing)
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 400 }
    );
  const passwordHash = await bcrypt.hash(data.password, 10);
  await db
    .insert(users)
    .values({ name: data.name, email: data.email, passwordHash });
  return NextResponse.json({ ok: true });
}
