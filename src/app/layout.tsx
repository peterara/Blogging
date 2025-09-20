import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Next Drizzle Blog',
  description: 'Minimal blog with Next.js, Drizzle ORM, and NextAuth',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <header className="mb-8 flex items-center justify-between">
            <a href="/" className="font-semibold">Next Drizzle Blog</a>
            <nav className="space-x-4 text-sm">
              <a href="/" className="hover:underline">Feed</a>
              <a href="/dashboard" className="hover:underline">Dashboard</a>
              <a href="/login" className="hover:underline">Login</a>
              <a href="/signup" className="hover:underline">Signup</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}


