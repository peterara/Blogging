import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db/client';
import { posts } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

const bodySchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(220).regex(/^[a-z0-9-]+$/),
  content: z.string().min(1),
  published: z.boolean(),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const json = await req.json();
  const data = bodySchema.parse(json);
  await db
    .update(posts)
    .set({ title: data.title, slug: data.slug, content: data.content, published: data.published })
    .where(and(eq(posts.id, params.id), eq(posts.authorId, session.user.id)));
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await db.delete(posts).where(and(eq(posts.id, params.id), eq(posts.authorId, session.user.id)));
  return NextResponse.json({ ok: true });
}


