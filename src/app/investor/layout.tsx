'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { INVESTOR_TOKEN } from '@/lib/config';

function InvestorSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-700">Acquitrust</div>
      <div className="p-4 border-b border-gray-700">
        <p className="text-xs text-gray-400">Investor</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/investor/dashboard" className="block px-3 py-2 rounded hover:bg-gray-800">Dashboard</Link>
        <Link href="/investor/discover" className="block px-3 py-2 rounded hover:bg-gray-800">Discover</Link>
        <Link href="/investor/watchlist" className="block px-3 py-2 rounded hover:bg-gray-800">Watchlist</Link>
        <Link href="/investor/access-requests" className="block px-3 py-2 rounded hover:bg-gray-800">Access Requests</Link>
        <Link href="/investor/notifications" className="block px-3 py-2 rounded hover:bg-gray-800">Notifications</Link>
        <Link href="/investor/profile" className="block px-3 py-2 rounded hover:bg-gray-800">Profile</Link>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button onClick={handleLogout} className="w-full text-left text-gray-400 hover:text-white">
          Log out
        </button>
      </div>
    </aside>
  );
}

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <InvestorSidebar />
      <main className="flex-1 overflow-auto p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
