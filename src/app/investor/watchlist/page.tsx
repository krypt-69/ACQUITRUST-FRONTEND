'use client';

import { useEffect, useState } from 'react';
import { API_BASE, INVESTOR_TOKEN } from '@/lib/config';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWatchlist = () => {
    fetch(`${API_BASE}/investor/watchlist`, {
      headers: { Authorization: `Bearer ${INVESTOR_TOKEN}` },
    })
      .then(res => res.json())
      .then(data => { setWatchlist(data); setError(''); })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchWatchlist(); }, []);

  const handleRemove = async (businessId: string) => {
    await fetch(`${API_BASE}/investor/watchlist/${businessId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${INVESTOR_TOKEN}` },
    });
    fetchWatchlist();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Watchlist</h1>
      {watchlist.length === 0 && <p>No saved businesses yet. Discover businesses to add them here.</p>}
      <ul className="space-y-3">
        {watchlist.map((item: any) => (
          <li key={item.business_id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.legal_name || 'Business'}</p>
              <p className="text-sm text-gray-600">Trust Score: {item.trust_score ?? 'N/A'}</p>
            </div>
            <button
              onClick={() => handleRemove(item.business_id)}
              className="text-red-600 hover:underline text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
