import Link from 'next/link';
import { db } from '@/db/client';
import { posts, users } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export default async function HomePage() {
  const rows = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      createdAt: posts.createdAt,
      authorName: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
    .limit(20);

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">Public Feed</h1>
      <ul className="space-y-4">
        {rows.map((p) => (
          <li key={p.id} className="border p-4 rounded">
            <Link href={`/post/${p.slug}`} className="text-lg font-semibold hover:underline">
              {p.title}
            </Link>
            <div className="text-sm text-gray-600">by {p.authorName ?? 'Unknown'} on {new Date(p.createdAt).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}


