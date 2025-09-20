"use client";
import { useState, FormEvent } from 'react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (res.ok) {
      window.location.href = '/login';
    } else {
      setError('Signup failed');
    }
  }

  return (
    <main className="max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-6">Signup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="space-y-1">
          <label className="text-sm">Name</label>
          <input className="border rounded p-2 w-full" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Email</label>
          <input className="border rounded p-2 w-full" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Password</label>
          <input className="border rounded p-2 w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="px-3 py-2 rounded bg-black text-white text-sm">Create Account</button>
      </form>
    </main>
  );
}


