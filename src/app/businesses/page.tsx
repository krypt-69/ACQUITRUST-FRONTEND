import { getPublicBusinesses } from '@/lib/api';
import BusinessCard from '@/components/business/BusinessCard';
import SearchFilters from '@/components/business/SearchFilters';

export default async function BusinessesPage(props: { searchParams: Promise<Record<string, string>> }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const industry = searchParams.industry;
  const country = searchParams.country;
  const trustMin = searchParams.trust_score_min ? Number(searchParams.trust_score_min) : undefined;

  const data = await getPublicBusinesses({ page, limit: 12, industry, country, trust_score_min: trustMin });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Discover Businesses</h1>
      <SearchFilters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.items.map((biz) => (
          <BusinessCard key={biz.id} business={biz} />
        ))}
      </div>
      <div className="flex justify-center gap-4">
        {page > 1 && <a href={`?page=${page - 1}`} className="px-4 py-2 bg-gray-200 rounded">Previous</a>}
        {page < data.pages && <a href={`?page=${page + 1}`} className="px-4 py-2 bg-gray-200 rounded">Next</a>}
      </div>
    </div>
  );
}
