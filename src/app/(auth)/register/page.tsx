'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function RegisterPage() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const { devToken, user, loginWithToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (devToken || user) {
      router.push('/dashboard');
    }
  }, [devToken, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await loginWithToken(token);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
      <p className="text-sm text-gray-600 mb-4">
        Paste your token to register.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Token</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="Enter your token"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
      </p>
    </div>
  );
}
