'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BusinessProvider, useBusiness } from '@/context/BusinessContext';
import { API_BASE, OWNER_TOKEN } from '@/lib/config';

function OwnerSidebar() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [error, setError] = useState('');
  const { selectedBusinessId, setSelectedBusinessId } = useBusiness();

  useEffect(() => {
    fetch(`${API_BASE}/businesses/`, {
      headers: { Authorization: `Bearer ${OWNER_TOKEN}` },
    })
      .then(res => res.json())
      .then(data => {
        setBusinesses(data);
        if (data.length > 0 && !selectedBusinessId) {
          setSelectedBusinessId(data[0].id);
        }
      })
      .catch(err => setError(err.message));
  }, [selectedBusinessId, setSelectedBusinessId]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-700">Acquitrust</div>
      {error && <p className="p-4 text-red-400 text-sm">{error}</p>}
      {businesses.length > 0 && (
        <div className="p-4 border-b border-gray-700">
          <label className="text-xs text-gray-400">Business</label>
          <select
            value={selectedBusinessId || ''}
            onChange={(e) => setSelectedBusinessId(e.target.value)}
            className="w-full bg-gray-800 text-white rounded mt-1 px-2 py-1"
          >
            {businesses.map((b) => (
              <option key={b.id} value={b.id}>{b.trading_name || b.legal_name}</option>
            ))}
          </select>
        </div>
      )}
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/owner/dashboard" className="block px-3 py-2 rounded hover:bg-gray-800">Dashboard</Link>
        <Link href="/owner/branches" className="block px-3 py-2 rounded hover:bg-gray-800">Branches</Link>
        <Link href="/owner/data-sources" className="block px-3 py-2 rounded hover:bg-gray-800">Data Sources</Link>
        <Link href="/owner/csv-upload" className="block px-3 py-2 rounded hover:bg-gray-800">CSV Upload</Link>
        <Link href="/owner/investor-activity" className="block px-3 py-2 rounded hover:bg-gray-800">Investor Activity</Link>
        <Link href="/owner/access-requests" className="block px-3 py-2 rounded hover:bg-gray-800">Access Requests</Link>
        <Link href="/owner/settings" className="block px-3 py-2 rounded hover:bg-gray-800">Settings</Link>
        <Link href="/owner/team" className="block px-3 py-2 rounded hover:bg-gray-800">Team</Link>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button onClick={handleLogout} className="w-full text-left text-gray-400 hover:text-white">
          Log out
        </button>
      </div>
    </aside>
  );
}

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      localStorage.setItem('authToken', OWNER_TOKEN);
    }
  }, []);

  return (
    <BusinessProvider>
      <div className="flex h-screen">
        <OwnerSidebar />
        <main className="flex-1 overflow-auto p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </BusinessProvider>
  );
}
