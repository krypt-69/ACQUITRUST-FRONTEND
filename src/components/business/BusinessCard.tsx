import Link from 'next/link';
import { PublicBusinessSummary } from '@/lib/types';
import TrustBadge from '@/components/ui/TrustBadge';

export default function BusinessCard({ business }: { business: PublicBusinessSummary }) {
  return (
    <Link href={`/businesses/${business.slug}`} className="bg-white rounded-lg shadow p-5 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg">{business.trading_name || business.legal_name}</h2>
          <p className="text-sm text-gray-500">{business.industry || 'General'} · {business.city}, {business.country}</p>
        </div>
        <TrustBadge score={business.trust_score} />
      </div>
      <div className="mt-3 text-sm text-gray-600">
        Revenue: {business.revenue_range ?? 'Unknown'}
      </div>
    </Link>
  );
}
