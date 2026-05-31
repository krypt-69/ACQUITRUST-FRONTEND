import { getTrustData } from '@/lib/api';

export default async function TrustPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const profile = await getTrustData(slug);
  if (!profile) return <div className="text-center py-20">Trust data not found</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Trust Report: {profile.trading_name || profile.legal_name}</h1>
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Overall Trust Score</span>
          <span className="text-3xl font-bold text-blue-600">{profile.trust_score ?? '—'}/100</span>
        </div>
        {profile.trust_score_components && (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(profile.trust_score_components).map(([key, val]) => (
              <div key={key} className="bg-gray-50 p-3 rounded">
                <div className="text-sm capitalize">{key.replace(/_/g, ' ')}</div>
                <div className="font-semibold">{val}</div>
              </div>
            ))}
          </div>
        )}
        <div className="text-sm text-gray-500">
          Verification: {profile.verification_status} · Last verified: {profile.last_verified ? new Date(profile.last_verified).toLocaleDateString() : 'Never'}
        </div>
        <div className="text-sm">
          Revenue range: {profile.revenue_range ?? 'Not available'}
        </div>
      </div>
    </div>
  );
}
