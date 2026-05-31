'use client';

import { useEffect, useState } from 'react';
import { useBusiness } from '@/context/BusinessContext';
import { API_BASE, OWNER_TOKEN } from '@/lib/config';

export default function AccessRequestsPage() {
  const { selectedBusinessId } = useBusiness();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = () => {
    if (!selectedBusinessId) return;
    fetch(`${API_BASE}/investor/access-requests?business_id=${selectedBusinessId}`, {
      headers: { Authorization: `Bearer ${OWNER_TOKEN}` },
    })
      .then(res => res.json())
      .then(setRequests)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchRequests(); }, [selectedBusinessId]);

  const handleAction = async (requestId: string, action: string) => {
    await fetch(`${API_BASE}/investor/access-requests/${requestId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OWNER_TOKEN}`,
      },
      body: JSON.stringify({ status: action }),
    });
    fetchRequests();
  };

  if (!selectedBusinessId) return <div>No business selected</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Access Requests</h1>
      {requests.length === 0 && <p>No pending access requests</p>}
      <ul className="space-y-4">
        {requests.map((req: any) => (
          <li key={req.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-medium">{req.business_name || 'Business'} · {req.requested_level} access</p>
              <p className="text-sm text-gray-600">{req.message || 'No message'} · Status: {req.status}</p>
            </div>
            {req.status === 'pending' && (
              <div className="flex gap-2">
                <button onClick={() => handleAction(req.id, 'approved')} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Approve</button>
                <button onClick={() => handleAction(req.id, 'rejected')} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Reject</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
