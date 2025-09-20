"use client";
import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      window.location.href = '/dashboard';
    } else {
      setError('Invalid credentials');
    }
  }

  return (
    <main className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="space-y-1">
          <label className="text-sm">Email</label>
          <input className="border rounded p-2 w-full" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Password</label>
          <input className="border rounded p-2 w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="px-3 py-2 rounded bg-black text-white text-sm">Login</button>
      </form>
    </main>
  );
}


