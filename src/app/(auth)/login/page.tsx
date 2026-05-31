'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE = 'http://192.168.1.157:8000/api/v1';

export default function LoginPage() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());
      const user = await res.json();
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on role
      if (user.roles.includes('business_owner')) {
        router.push('/owner/dashboard');
      } else if (user.roles.includes('investor')) {
        router.push('/investor/dashboard');
      } else {
        router.push('/dashboard'); // fallback
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Log in</h1>
      <p className="text-sm text-gray-600 mb-4">
        Use <code>test-token</code>, <code>test-token-investor</code>, or <code>test-token-admin</code>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter your token"
          className="w-full border px-3 py-2 rounded"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign in
        </button>
      </form>
    </div>
  );
}
