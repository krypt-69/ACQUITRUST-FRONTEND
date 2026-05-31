import { getPublicBusinessProfile } from '@/lib/api';
import TrustBadge from '@/components/ui/TrustBadge';
import RevenueRange from '@/components/ui/RevenueRange';

export default async function BusinessProfilePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const profile = await getPublicBusinessProfile(slug);
  if (!profile) return <div className="text-center py-20">Business not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">{profile.trading_name || profile.legal_name}</h1>
          <p className="text-gray-500">{profile.industry || 'General'} · {profile.city}, {profile.country}</p>
        </div>
        <div className="flex items-center gap-2">
          <TrustBadge score={profile.trust_score} />
          <span className="text-sm text-gray-600">
            {profile.verification_status === 'verified' ? '✅ Verified' : 'Unverified'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-gray-700">{profile.description || 'No description provided.'}</p>
          </section>
          {profile.business_story && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Story</h2>
              <p className="text-gray-700">{profile.business_story}</p>
            </section>
          )}
        </div>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Trust Score</h3>
            <p className="text-2xl font-bold">{profile.trust_score ? `${profile.trust_score}/100` : 'Pending'}</p>
            {profile.trust_score_components && (
              <div className="mt-2 space-y-1 text-sm">
                {Object.entries(profile.trust_score_components).map(([key, val]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="font-medium">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Revenue</h3>
            <RevenueRange range={profile.revenue_range} />
            <p className="text-sm mt-1">Growth: {profile.growth_trend !== undefined ? `${profile.growth_trend}%` : 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-500">
        Last verified: {profile.last_verified ? new Date(profile.last_verified).toLocaleDateString() : 'Never'}
      </div>
    </div>
  );
}
