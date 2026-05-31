import { getPublicBusinessProfile } from '@/lib/api';
import { PublicBusinessProfile } from '@/lib/types';

export default async function TrustPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  let profile: PublicBusinessProfile | null = null;
  let error = '';

  try {
    profile = await getPublicBusinessProfile(slug);
  } catch (e: any) {
    error = e.message;
  }

  if (error || !profile) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-600">Trust data not found</h1>
        <p className="mt-2 text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Trust Report</h1>
        <p className="text-xl mt-2 font-semibold">{profile.trading_name || profile.legal_name}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Overall Trust Score</span>
          <span className="text-3xl font-bold text-blue-600">
            {profile.trust_score ? `${Math.round(profile.trust_score)}/100` : '—'}
          </span>
        </div>

        {profile.trust_score_components && (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(profile.trust_score_components).map(([key, val]) => (
              <div key={key} className="bg-gray-50 p-3 rounded">
                <div className="text-sm capitalize text-gray-600">{key.replace(/_/g, ' ')}</div>
                <div className="text-lg font-semibold">{val}</div>
              </div>
            ))}
          </div>
        )}

        <div className="text-sm text-gray-600 space-y-1">
          <p>Verification: {profile.verification_status}</p>
          {profile.verification_severity && <p>Severity: {profile.verification_severity}</p>}
          <p>Last verified: {profile.last_verified ? new Date(profile.last_verified).toLocaleDateString() : 'Never'}</p>
        </div>

        <div className="text-sm">
          Revenue range: <span className="font-medium">{profile.revenue_range ?? 'Not available'}</span>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        This report is generated from verified data sources.
      </div>
    </div>
  );
}
