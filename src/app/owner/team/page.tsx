'use client';

import { useBusiness } from '@/context/BusinessContext';

export default function TeamPage() {
  const { selectedBusinessId } = useBusiness();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Team</h1>
      <p>Manage staff and their roles.</p>
      <p className="text-sm text-gray-600">Feature coming in V1.5</p>
    </div>
  );
}
