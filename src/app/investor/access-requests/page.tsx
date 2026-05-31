'use client';

import { useEffect, useState } from 'react';
import { API_BASE, INVESTOR_TOKEN } from '@/lib/config';

export default function AccessRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/investor/access-requests`, {
      headers: { Authorization: `Bearer ${INVESTOR_TOKEN}` },
    })
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Access Requests</h1>
      {requests.length === 0 && <p>No access requests made yet.</p>}
      <ul className="space-y-3">
        {requests.map((req: any) => (
          <li key={req.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{req.business_name || req.business_id}</p>
              <p className="text-sm text-gray-600">Level: {req.requested_level} · Status: {req.status}</p>
              {req.message && <p className="text-sm italic mt-1">"{req.message}"</p>}
            </div>
            {req.status === 'approved' && (
              <span className="text-green-700 text-sm font-medium">✓ Approved</span>
            )}
            {req.status === 'rejected' && (
              <span className="text-red-700 text-sm font-medium">✗ Rejected</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
