'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API_BASE = '/api/v1';
const TOKEN = 'test-token-investor';

export default function InvestorDashboard() {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/investor/watchlist`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
      .then(res => res.json())
      .then(setWatchlist)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/investor/access-requests`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
      .then(res => res.json())
      .then(setRequests)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Investor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Watchlist</h2>
          {watchlist.length === 0 && <p className="text-gray-500">No saved businesses</p>}
          <ul className="space-y-2">
            {watchlist.map((item: any) => (
              <li key={item.business_id} className="flex justify-between">
                <Link href={`/businesses/${item.business_id}`} className="text-blue-600 hover:underline">
                  {item.legal_name || item.business_id}
                </Link>
                <span className="text-sm text-gray-500">Trust: {item.trust_score ?? 'N/A'}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Access Requests</h2>
          {requests.length === 0 && <p className="text-gray-500">No pending requests</p>}
          <ul className="space-y-2">
            {requests.map((req: any) => (
              <li key={req.id} className="text-sm">
                <span className="font-medium">{req.business_name || req.business_id}</span> – {req.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
