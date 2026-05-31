'use client';

import { useEffect, useState } from 'react';
import { useBusiness } from '@/context/BusinessContext';
import { API_BASE, OWNER_TOKEN } from '@/lib/config';

export default function DataSourcesPage() {
  const { selectedBusinessId } = useBusiness();
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form fields
  const [sourceType, setSourceType] = useState('mpesa');
  const [sourceName, setSourceName] = useState('');
  const [credRef, setCredRef] = useState('');

  const fetchSources = () => {
    if (!selectedBusinessId) return;
    setLoading(true);
    fetch(`${API_BASE}/events/sources/${selectedBusinessId}`, {
      headers: { Authorization: `Bearer ${OWNER_TOKEN}` },
    })
      .then(res => res.json())
      .then(data => {
        // Ensure we have an array
        const list = Array.isArray(data) ? data : [];
        setSources(list);
        setError('');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchSources(); }, [selectedBusinessId]);

  const handleAddSource = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/events/sources/${selectedBusinessId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OWNER_TOKEN}`,
        },
        body: JSON.stringify({
          source_type: sourceType,
          source_name: sourceName,
          credentials_reference: credRef,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSourceName('');
      setCredRef('');
      fetchSources();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!selectedBusinessId) return <div>No business selected</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Data Sources</h1>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Connect a New Source</h2>
        <form onSubmit={handleAddSource} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium">Source Type</label>
            <select
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
            >
              <option value="mpesa">M-Pesa</option>
              <option value="shopify">Shopify</option>
              <option value="odoo">Odoo</option>
              <option value="erpnext">ERPNext</option>
              <option value="custom_api">Custom API</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Source Name</label>
            <input
              type="text"
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Credentials Reference</label>
            <input
              type="text"
              value={credRef}
              onChange={(e) => setCredRef(e.target.value)}
              placeholder="vault://path or API key reference"
              className="w-full border px-3 py-2 rounded mt-1"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Source
          </button>
        </form>
      </div>

      <div>
        {loading && <div>Loading sources...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && sources.length === 0 && <p>No data sources connected</p>}
        <ul className="space-y-2">
          {sources.map((s: any) => (
            <li key={s.id} className="bg-white p-4 rounded shadow flex justify-between">
              <div>
                <p className="font-medium">{s.source_name}</p>
                <p className="text-sm text-gray-600">{s.source_type} · Last sync: {s.last_sync || 'Never'}</p>
              </div>
              <span className={`text-sm px-2 py-1 rounded ${s.connection_status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {s.connection_status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
