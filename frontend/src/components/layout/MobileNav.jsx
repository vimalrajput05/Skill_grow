import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Briefcase, CircleUser,UserCircle } from 'lucide-react';

const mobileNavItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/learn', icon: BookOpen, label: 'Learn' },
  { to: '/trainers', icon: Users, label: 'Trainers' },
  { to: '/jobs', icon: Briefcase, label: 'Jobs' },
  { to: '/profile', icon: UserCircle, label: 'Profile' },
];

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-area-pb">
      <div className="flex items-stretch">
        {mobileNavItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-colors ${
                isActive ? 'text-green-600' : 'text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} className={isActive ? 'text-green-600' : 'text-gray-400'} />
                <span className={`text-xs font-medium ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                  {label}
                </span>
                {isActive && (
                  <span className="absolute top-0 w-8 h-0.5 bg-green-600 rounded-full -mt-px" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
