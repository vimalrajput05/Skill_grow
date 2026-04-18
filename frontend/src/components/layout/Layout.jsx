import { ReactNode } from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileNav from './MobileNav';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopSidebar />
      <main className="lg:ml-64 pb-20 lg:pb-6 min-h-screen">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
