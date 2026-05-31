'use client';

import { useEffect, useState } from 'react';
import { useBusiness } from '@/context/BusinessContext';
import { API_BASE, OWNER_TOKEN } from '@/lib/config';

export default function SettingsPage() {
  const { selectedBusinessId } = useBusiness();
  const [settings, setSettings] = useState({
    is_discoverable: false,
    public_profile_enabled: true,
    show_revenue_level: 'RANGE',
    description: '',
    business_story: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (selectedBusinessId) {
      // Fetch current business to prefill (optional; we'll just use defaults)
    }
  }, [selectedBusinessId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/businesses/${selectedBusinessId}/settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OWNER_TOKEN}`,
        },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error(await res.text());
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!selectedBusinessId) return <div>No business selected</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg space-y-4">
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.is_discoverable}
              onChange={(e) => setSettings({ ...settings, is_discoverable: e.target.checked })}
            />
            <span>Show in public discovery</span>
          </label>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.public_profile_enabled}
              onChange={(e) => setSettings({ ...settings, public_profile_enabled: e.target.checked })}
            />
            <span>Enable public trust page</span>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">Revenue Visibility</label>
          <select
            value={settings.show_revenue_level}
            onChange={(e) => setSettings({ ...settings, show_revenue_level: e.target.value })}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            <option value="RANGE">Range only</option>
            <option value="EXACT">Exact (for approved investors)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={settings.description}
            onChange={(e) => setSettings({ ...settings, description: e.target.value })}
            className="w-full border px-3 py-2 rounded mt-1"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Business Story</label>
          <textarea
            value={settings.business_story}
            onChange={(e) => setSettings({ ...settings, business_story: e.target.value })}
            className="w-full border px-3 py-2 rounded mt-1"
            rows={3}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Settings
        </button>
        {saved && <span className="text-green-600 ml-3">Saved!</span>}
      </form>
    </div>
  );
}
