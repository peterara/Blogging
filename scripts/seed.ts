import "dotenv/config";
import { db } from "@/db/client";
import { users, posts } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

async function main() {
  const email = "demo@example.com";
  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  let userId: string;
  if (!existing) {
    const passwordHash = await bcrypt.hash("password", 10);
    const inserted = await db
      .insert(users)
      .values({ name: "Demo User", email, passwordHash })
      .returning({ id: users.id });
    userId = inserted[0].id;
  } else {
    userId = existing.id;
  }

  const samples = [
    {
      title: "Hello World",
      slug: "hello-world",
      content: "# Hello World\nThis is a seeded post.",
      published: true,
    },
    {
      title: "Draft Post",
      slug: "draft-post",
      content: "This is a draft.",
      published: false,
    },
  ];

  for (const p of samples) {
    await db
      .insert(posts)
      .values({ ...p, authorId: userId })
      .onConflictDoNothing();
  }

  console.log("Seed completed");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
