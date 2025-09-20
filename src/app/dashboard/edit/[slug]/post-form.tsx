"use client";
import { useState, FormEvent } from 'react';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import type { Post } from '@/db/schema';

export function EditPostForm({ post }: { post: Post }) {
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [content, setContent] = useState(post.content);
  const [published, setPublished] = useState(post.published);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/posts/' + post.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, content, published }),
      });
      if (!res.ok) throw new Error(await res.text());
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message ?? 'Failed to update');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this post?')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/posts/' + post.id, { method: 'DELETE' });
      if (!res.ok) throw new Error(await res.text());
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Failed to delete');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="space-y-1">
        <label className="text-sm">Title</label>
        <input className="border rounded p-2 w-full" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="space-y-1">
        <label className="text-sm">Slug</label>
        <input className="border rounded p-2 w-full" value={slug} onChange={(e) => setSlug(e.target.value)} required />
      </div>
      <div className="space-y-1">
        <label className="text-sm">Content</label>
        <MarkdownEditor value={content} onChange={setContent} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> Publish
      </label>
      <div className="flex items-center gap-3">
        <button disabled={loading} className="px-3 py-2 rounded bg-black text-white text-sm">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={handleDelete} className="px-3 py-2 rounded bg-red-600 text-white text-sm">Delete</button>
      </div>
    </form>
  );
}


