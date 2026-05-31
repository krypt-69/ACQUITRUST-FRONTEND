'use client';

import { useBusiness } from '@/context/BusinessContext';
import { useEffect, useState } from 'react';
import { API_BASE, OWNER_TOKEN } from '@/lib/config';

export default function DashboardPage() {
  const { selectedBusinessId } = useBusiness();
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedBusinessId) return;
    const url = `${API_BASE}/businesses/${selectedBusinessId}/dashboard`;
    console.log('Fetching dashboard from:', url);
    fetch(url, {
      headers: { Authorization: `Bearer ${OWNER_TOKEN}` },
    })
      .then(res => {
        console.log('Response status:', res.status);
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        console.log('Dashboard data:', data);
        setDashboard(data);
      })
      .catch(err => {
        console.error('Dashboard error:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [selectedBusinessId]);

  if (!selectedBusinessId) return <div>No business selected</div>;
  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!dashboard) return <div>No dashboard data</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Trust Score</h2>
          <p className="text-4xl font-bold text-blue-600">
            {dashboard.trust_score?.overall ? `${dashboard.trust_score.overall}/100` : 'Pending'}
          </p>
          {dashboard.trust_score?.components && (
            <div className="mt-2 text-sm space-y-1">
              {Object.entries(dashboard.trust_score.components).map(([key, val]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key.replace(/_/g, ' ')}</span>
                  <span>{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">Verification</h2>
          {dashboard.verification ? (
            <>
              <p className="text-xl font-medium">Score: {dashboard.verification.score}</p>
              <p className="text-sm">Severity: {dashboard.verification.severity}</p>
            </>
          ) : (
            <p>No verification data</p>
          )}
        </div>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Analytics Snapshot</h2>
        {dashboard.analytics ? (
          <pre className="text-sm">{JSON.stringify(dashboard.analytics, null, 2)}</pre>
        ) : <p>No analytics available</p>}
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Data Sources</h2>
        {dashboard.sources?.length > 0 ? (
          <ul className="space-y-2">
            {dashboard.sources.map((s: any) => (
              <li key={s.id} className="flex justify-between items-center">
                <span>{s.name} ({s.type})</span>
                <span className={`text-xs px-2 py-1 rounded ${s.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{s.status}</span>
              </li>
            ))}
          </ul>
        ) : <p>No data sources connected</p>}
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Recommendations</h2>
        {dashboard.recommendations?.length > 0 ? (
          <ul className="list-disc pl-5">
            {dashboard.recommendations.map((r: string, i: number) => <li key={i}>{r}</li>)}
          </ul>
        ) : <p>No recommendations</p>}
      </div>
    </div>
  );
}
