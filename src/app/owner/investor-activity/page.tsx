'use client';

import { useEffect, useState } from 'react';
import { useBusiness } from '@/context/BusinessContext';
import { API_BASE, OWNER_TOKEN } from '@/lib/config';

export default function InvestorActivityPage() {
  const { selectedBusinessId } = useBusiness();
  const [activity, setActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedBusinessId) {
      fetch(`${API_BASE}/businesses/${selectedBusinessId}/activity`, {
        headers: { Authorization: `Bearer ${OWNER_TOKEN}` },
      })
        .then(res => res.json())
        .then(setActivity)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [selectedBusinessId]);

  if (!selectedBusinessId) return <div>No business selected</div>;
  if (loading) return <div>Loading...</div>;
  if (!activity) return <div>No activity data</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Investor Activity</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl font-bold">{activity.profile_views}</p>
          <p className="text-sm text-gray-600">Profile Views</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl font-bold">{activity.saves}</p>
          <p className="text-sm text-gray-600">Saves</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl font-bold">{activity.access_requests}</p>
          <p className="text-sm text-gray-600">Access Requests</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
        {activity.recent_activities.length === 0 && <p>No recent activity</p>}
        <ul className="space-y-2">
          {activity.recent_activities.map((a: any, i: number) => (
            <li key={i} className="text-sm">
              {a.investor_name || 'Someone'} {a.action} · {new Date(a.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
