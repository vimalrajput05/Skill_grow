import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, BookOpen, Users, CalendarDays, CreditCard, Sparkles, Briefcase, Factory, ShieldCheck, TrendingUp, UserCircle, Sprout } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, en: 'Dashboard', hi: 'होम' },
  { to: '/add-skill', icon: PlusCircle, en: 'Add Skill', hi: 'स्किल जोड़ें' },
  { to: '/learn', icon: BookOpen, en: 'Learn Skill', hi: 'सीखें' },
  { to: '/trainers', icon: Users, en: 'Find Trainer', hi: 'ट्रेनर' },
  { to: '/slots', icon: CalendarDays, en: 'Training Slots', hi: 'स्लॉट' },
  { to: '/payment', icon: CreditCard, en: 'Payment', hi: 'भुगतान' },
  { to: '/ai-awareness', icon: Sparkles, en: 'AI Awareness', hi: 'AI जागरूकता' },
  { to: '/jobs', icon: Briefcase, en: 'Jobs', hi: 'नौकरी' },
  { to: '/micro-industry', icon: Factory, en: 'Micro-Industry', hi: 'उद्योग' },
  { to: '/safety', icon: ShieldCheck, en: 'Safety', hi: 'सुरक्षा' },
  { to: '/progress', icon: TrendingUp, en: 'My Progress', hi: 'प्रगति' },
  { to: '/profile', icon: UserCircle, en: 'Profile', hi: 'प्रोफाइल' },
];

export default function DesktopSidebar() {
  const { lang } = useAppContext();

  return (
    <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-white border-r border-gray-100 fixed top-0 left-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
        <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center shadow-sm">
          <Sprout className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-black text-gray-900 text-sm leading-none">SkillGrow</p>
          <p className="text-xs text-green-600 mt-0.5">स्किलग्रो इंडिया</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto scrollbar-hide space-y-0.5">
        {navItems.map(({ to, icon: Icon, en, hi }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'} />
                <div className="leading-none">
                  <span className="block text-sm">{lang === 'hi' ? hi : en}</span>
                  {lang === 'en' && <span className="block text-xs text-gray-400 mt-0.5">{hi}</span>}
                </div>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-gray-100">
        <div className="bg-green-50 border border-green-100 rounded-xl p-3">
          <p className="text-xs font-bold text-green-800">📞 Helpline</p>
          <p className="text-xs text-green-600 mt-0.5">1800-XXX-XXXX (Free)</p>
        </div>
      </div>
    </aside>
  );
}
