import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, BookOpen, Users, CalendarDays, CreditCard, Sparkles, Briefcase, Factory, ShieldCheck, TrendingUp, CircleUser,UserCircle, Sprout } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', labelHi: 'होम' },
  { to: '/add-skill', icon: PlusCircle, label: 'Add Skill', labelHi: 'स्किल जोड़ें' },
  { to: '/learn', icon: BookOpen, label: 'Learn Skill', labelHi: 'सीखें' },
  { to: '/trainers', icon: Users, label: 'Find Trainer', labelHi: 'ट्रेनर' },
  { to: '/slots', icon: CalendarDays, label: 'Training Slots', labelHi: 'स्लॉट' },
  { to: '/payment', icon: CreditCard, label: 'Payment', labelHi: 'भुगतान' },
  { to: '/ai-awareness', icon: Sparkles, label: 'AI Awareness', labelHi: 'AI जागरूकता' },
  { to: '/jobs', icon: Briefcase, label: 'Jobs', labelHi: 'नौकरी' },
  { to: '/micro-industry', icon: Factory, label: 'Micro-Industry', labelHi: 'उद्योग' },
  { to: '/safety', icon: ShieldCheck, label: 'Safety', labelHi: 'सुरक्षा' },
  { to: '/progress', icon: TrendingUp, label: 'My Progress', labelHi: 'प्रगति' },
  { to: '/profile', icon: UserCircle, label: 'Profile', labelHi: 'प्रोफाइल' },
];

export default function DesktopSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-gray-100 fixed top-0 left-0 z-30">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
          <Sprout className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm leading-tight">SkillGrow India</p>
          <p className="text-xs text-green-600">स्किलग्रो इंडिया</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
        {navItems.map(({ to, icon: Icon, label, labelHi }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`} size={18} />
                <div className="leading-tight">
                  <span className="block">{label}</span>
                  <span className="block text-xs opacity-60">{labelHi}</span>
                </div>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-gray-100">
        <div className="bg-green-50 rounded-xl p-3">
          <p className="text-xs font-semibold text-green-800">Need Help? (मदद चाहिए?)</p>
          <p className="text-xs text-green-600 mt-0.5">Call: 1800-XXX-XXXX</p>
        </div>
      </div>
    </aside>
  );
}
