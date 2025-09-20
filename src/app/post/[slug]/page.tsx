import { db } from '@/db/client';
import { posts, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const [row] = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      published: posts.published,
      authorName: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.slug, slug))
    .limit(1);

  if (!row || !row.published) {
    return <div>Post not found.</div>;
  }

  return (
    <main className="prose max-w-none">
      <h1>{row.title}</h1>
      <p className="text-sm text-gray-600">by {row.authorName ?? 'Unknown'}</p>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{row.content}</ReactMarkdown>
    </main>
  );
}


