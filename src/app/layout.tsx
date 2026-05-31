import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata = {
  title: 'Acquitrust - Business Trust Infrastructure',
  description: 'Discover and evaluate trustworthy businesses.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <AuthProvider>
          {/* We'll show Navbar/Footer only for public pages; the owner layout has its own */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
