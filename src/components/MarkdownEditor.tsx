"use client";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function MarkdownEditor({ value = '', onChange }: MarkdownEditorProps) {
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  return (
    <div className="border rounded">
      <div className="flex text-sm border-b">
        <button type="button" className={`px-3 py-2 ${tab === 'write' ? 'bg-gray-100' : ''}`} onClick={() => setTab('write')}>Write</button>
        <button type="button" className={`px-3 py-2 ${tab === 'preview' ? 'bg-gray-100' : ''}`} onClick={() => setTab('preview')}>Preview</button>
      </div>
      {tab === 'write' ? (
        <textarea
          className="w-full p-3 min-h-[250px] outline-none"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Write markdown..."
        />
      ) : (
        <div className="p-3 prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value || '*Nothing to preview*'}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}


