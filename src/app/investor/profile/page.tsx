'use client';

import { useEffect, useState } from 'react';
import { API_BASE, INVESTOR_TOKEN } from '@/lib/config';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/investors/me`, {
      headers: { Authorization: `Bearer ${INVESTOR_TOKEN}` },
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Failed to load profile</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Investor Profile</h1>
      <div className="bg-white p-6 rounded shadow max-w-md space-y-3">
        <p><span className="font-medium">Organization:</span> {profile.organization_name || 'N/A'}</p>
        <p><span className="font-medium">Type:</span> {profile.investor_type}</p>
        <p><span className="font-medium">Country:</span> {profile.country}</p>
        <p><span className="font-medium">Risk Tolerance:</span> {profile.risk_tolerance || 'N/A'}</p>
        <p><span className="font-medium">Preferences:</span> {profile.investment_preferences?.join(', ') || 'None'}</p>
        <p className="text-xs text-gray-500">Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
