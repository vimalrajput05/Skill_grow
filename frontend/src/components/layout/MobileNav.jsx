import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Briefcase, UserCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const items = [
  { to: '/dashboard', icon: LayoutDashboard, en: 'Home', hi: 'होम' },
  { to: '/learn', icon: BookOpen, en: 'Learn', hi: 'सीखें' },
  { to: '/trainers', icon: Users, en: 'Trainers', hi: 'ट्रेनर' },
  { to: '/jobs', icon: Briefcase, en: 'Jobs', hi: 'नौकरी' },
  { to: '/profile', icon: UserCircle, en: 'Profile', hi: 'प्रोफाइल' },
];

export default function MobileNav() {
  const { lang } = useAppContext();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-stretch h-16">
        {items.map(({ to, icon: Icon, en, hi }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center gap-1 transition-colors relative ${isActive ? 'text-green-600' : 'text-gray-400'}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-green-600 rounded-full" />}
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="text-xs font-medium">{lang === 'hi' ? hi : en}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
