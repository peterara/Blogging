import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/db/client';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { EditPostForm } from './post-form';

interface EditPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');
  const { slug } = await params;
  const [row] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  if (!row || row.authorId !== session.user.id) redirect('/dashboard');
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Post</h1>
      <EditPostForm post={row} />
    </main>
  );
}


