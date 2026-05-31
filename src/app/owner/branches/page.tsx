'use client';

import { useEffect, useState } from 'react';
import { useBusiness } from '@/context/BusinessContext';
import { API_BASE, OWNER_TOKEN } from '@/lib/config';

export default function BranchesPage() {
  const { selectedBusinessId } = useBusiness();
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // New branch form
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const fetchBranches = () => {
    if (!selectedBusinessId) return;
    setLoading(true);
    fetch(`${API_BASE}/businesses/${selectedBusinessId}/branches`, {
      headers: { Authorization: `Bearer ${OWNER_TOKEN}` },
    })
      .then(res => res.json())
      .then(data => {
        setBranches(data);
        setError('');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBranches();
  }, [selectedBusinessId]);

  const handleAddBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/businesses/${selectedBusinessId}/branches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OWNER_TOKEN}`,
        },
        body: JSON.stringify({ name, code, city, country }),
      });
      if (!res.ok) throw new Error(await res.text());
      // Clear form and refresh list
      setName(''); setCode(''); setCity(''); setCountry('');
      fetchBranches();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!selectedBusinessId) return <div>No business selected</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Branches</h1>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Add New Branch</h2>
        <form onSubmit={handleAddBranch} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium">Branch Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Branch Code *</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Branch
          </button>
        </form>
      </div>

      <div>
        {loading && <div>Loading branches...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && branches.length === 0 && <p>No branches yet</p>}
        <ul className="space-y-2">
          {branches.map((b: any) => (
            <li key={b.id} className="bg-white p-4 rounded shadow flex justify-between">
              <div>
                <p className="font-medium">{b.name}</p>
                <p className="text-sm text-gray-600">{b.code} · {b.city}, {b.country}</p>
              </div>
              <span className={`text-sm px-2 py-1 rounded ${b.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-200'}`}>
                {b.is_active ? 'Active' : 'Inactive'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
