'use client';

import { useEffect, useState } from 'react';
import { API_BASE, INVESTOR_TOKEN } from '@/lib/config';

export default function DiscoverPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/public/businesses`, {
      headers: { Authorization: `Bearer ${INVESTOR_TOKEN}` },
    })
      .then(res => res.json())
      .then(data => setBusinesses(data.items || []))
      .catch(console.error);
  }, []);

  const handleSave = async (businessId: string) => {
    await fetch(`${API_BASE}/investor/watchlist/${businessId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${INVESTOR_TOKEN}` },
    });
    alert('Added to watchlist');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Discover Businesses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((biz: any) => (
          <div key={biz.id} className="bg-white p-4 rounded shadow flex flex-col justify-between">
            <div>
              <h2 className="font-semibold">{biz.trading_name || biz.legal_name}</h2>
              <p className="text-sm text-gray-500">{biz.industry || 'General'} · {biz.city}, {biz.country}</p>
              <p className="text-sm mt-1">Trust: {biz.trust_score ?? 'N/A'}/100</p>
            </div>
            <button onClick={() => handleSave(biz.id)} className="mt-3 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
