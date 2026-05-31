import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          The Business Trust Platform
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Verified revenue, trust scores, and growth metrics—so investors can make confident decisions.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/businesses" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
            Explore Businesses
          </Link>
          <Link href="/register" className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">
            Join as a Business
          </Link>
        </div>
      </section>
    </div>
  );
}
