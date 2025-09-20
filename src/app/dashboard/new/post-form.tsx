"use client";
import { useState, FormEvent } from 'react';
import { MarkdownEditor } from '@/components/MarkdownEditor';

export function NewPostForm() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, content, published }),
      });
      if (!res.ok) throw new Error(await res.text());
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message ?? 'Failed to create');
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
      <button disabled={loading} className="px-3 py-2 rounded bg-black text-white text-sm">
        {loading ? 'Saving...' : 'Create Post'}
      </button>
    </form>
  );
}


