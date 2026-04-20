import DesktopSidebar from './DesktopSidebar';
import MobileNav from './MobileNav';
import TopBar from './TopBar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DesktopSidebar />
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 pb-20 lg:pb-6 overflow-x-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5">
            {children}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
