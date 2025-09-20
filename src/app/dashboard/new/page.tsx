import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { NewPostForm } from './post-form';

export default async function NewPostPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold">New Post</h1>
      <NewPostForm />
    </main>
  );
}


