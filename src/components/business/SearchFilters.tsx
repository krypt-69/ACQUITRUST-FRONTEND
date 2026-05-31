'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const params = new URLSearchParams();
    const industry = form.industry.value;
    const country = form.country.value;
    const trustMin = form.trust_min.value;
    if (industry) params.set('industry', industry);
    if (country) params.set('country', country);
    if (trustMin) params.set('trust_score_min', trustMin);
    router.push(`/businesses?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 bg-white p-4 rounded shadow">
      <input name="industry" placeholder="Industry" className="border px-3 py-2 rounded" />
      <input name="country" placeholder="Country" className="border px-3 py-2 rounded" />
      <input name="trust_min" type="number" placeholder="Min Trust Score" className="border px-3 py-2 rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Filter</button>
    </form>
  );
}
