import Link from 'next/link';
import { auth } from '@/lib/auth';
import { db } from '@/db/client';
import { posts } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <div>
        <p className="mb-4">You must be logged in.</p>
        <Link href="/login" className="underline">Go to login</Link>
      </div>
    );
  }

  const rows = await db
    .select({ id: posts.id, title: posts.title, slug: posts.slug, published: posts.published })
    .from(posts)
    .where(eq(posts.authorId, session.user.id))
    .orderBy(desc(posts.createdAt));

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Posts</h1>
        <Link href="/dashboard/new" className="px-3 py-2 rounded bg-black text-white text-sm">New Post</Link>
      </div>
      <ul className="space-y-3">
        {rows.map((p) => (
          <li key={p.id} className="border p-3 rounded flex items-center justify-between">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-xs text-gray-600">/{p.slug}</div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className={`px-2 py-1 rounded ${p.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {p.published ? 'Published' : 'Draft'}
              </span>
              <Link href={`/dashboard/edit/${p.slug}`} className="underline">Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}


