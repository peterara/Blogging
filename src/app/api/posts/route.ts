import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db/client';
import { posts } from '@/db/schema';
import { z } from 'zod';

const bodySchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(220).regex(/^[a-z0-9-]+$/),
  content: z.string().min(1),
  published: z.boolean().optional().default(false),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const json = await req.json();
  const data = bodySchema.parse(json);
  await db.insert(posts).values({
    authorId: session.user.id,
    title: data.title,
    slug: data.slug,
    content: data.content,
    published: data.published ?? false,
  });
  return NextResponse.json({ ok: true });
}


