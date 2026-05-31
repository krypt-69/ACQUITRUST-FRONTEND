import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-blue-600">Acquitrust</Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/businesses" className="hover:text-blue-600">Businesses</Link>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
          <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Get Started</Link>
        </div>
      </div>
    </nav>
  );
}
