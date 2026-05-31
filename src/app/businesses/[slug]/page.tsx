import { getPublicBusinessProfile } from '@/lib/api';
import { PublicBusinessProfile } from '@/lib/types';
import TrustBadge from '@/components/ui/TrustBadge';
import RevenueRange from '@/components/ui/RevenueRange';

export default async function BusinessProfilePage(props: { params: Promise<{ slug: string }> }) {
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
        <h1 className="text-2xl font-bold text-red-600">Business not found</h1>
        <p className="mt-2 text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{profile.trading_name || profile.legal_name}</h1>
          <p className="text-lg text-gray-600">{profile.industry || 'General'} · {profile.city}, {profile.country}</p>
          {profile.description && (
            <p className="mt-2 text-gray-700">{profile.description}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <TrustBadge score={profile.trust_score} />
          <span className="text-sm font-medium text-gray-700">
            {profile.verification_status === 'verified' ? '✅ Verified' : '⚠️ Unverified'}
          </span>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column: story, about */}
        <div className="col-span-2 space-y-6">
          {profile.business_story && (
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Our Story</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{profile.business_story}</p>
            </section>
          )}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Business Details</h2>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="font-medium">Legal Name</dt>
              <dd>{profile.legal_name}</dd>
              <dt className="font-medium">Industry</dt>
              <dd>{profile.industry || '—'}</dd>
              <dt className="font-medium">Country</dt>
              <dd>{profile.country}</dd>
              <dt className="font-medium">City</dt>
              <dd>{profile.city}</dd>
              <dt className="font-medium">Branches</dt>
              <dd>{profile.branches}</dd>
            </dl>
          </section>
        </div>

        {/* Right column: trust & revenue */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Trust Score</h3>
            <div className="text-4xl font-bold text-blue-600">
              {profile.trust_score ? `${Math.round(profile.trust_score)}/100` : 'Pending'}
            </div>
            {profile.trust_score_components && (
              <div className="mt-3 space-y-1 text-sm">
                {Object.entries(profile.trust_score_components).map(([key, val]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize text-gray-600">{key.replace(/_/g, ' ')}</span>
                    <span className="font-medium">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-2">Revenue</h3>
            <RevenueRange range={profile.revenue_range} />
            {profile.growth_trend !== undefined && (
              <p className="text-sm mt-1">
                Growth trend: <span className="font-medium">{profile.growth_trend}%</span>
              </p>
            )}
          </div>

          <div className="bg-white p-5 rounded-lg shadow text-sm">
            <h3 className="font-semibold text-lg mb-2">Verification</h3>
            <p>Status: {profile.verification_status}</p>
            {profile.verification_severity && (
              <p>Severity: {profile.verification_severity}</p>
            )}
            <p className="mt-1">
              Last verified: {profile.last_verified
                ? new Date(profile.last_verified).toLocaleDateString()
                : 'Never'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
