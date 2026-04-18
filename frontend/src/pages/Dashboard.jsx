import { Link } from 'react-router-dom';
import { Bell, MapPin, PlusCircle, BookOpen, Users, Sparkles, Briefcase, Factory, ChevronRight, TrendingUp, Award, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const quickActions = [
  { to: '/add-skill', icon: PlusCircle, label: 'Add My Skill', labelHi: 'स्किल जोड़ें', bg: 'bg-green-500', shadow: 'shadow-green-200' },
  { to: '/learn', icon: BookOpen, label: 'Learn Skill', labelHi: 'नई स्किल सीखें', bg: 'bg-blue-500', shadow: 'shadow-blue-200' },
  { to: '/trainers', icon: Users, label: 'Find Trainer', labelHi: 'ट्रेनर खोजें', bg: 'bg-orange-500', shadow: 'shadow-orange-200' },
  { to: '/ai-awareness', icon: Sparkles, label: 'AI Awareness', labelHi: 'AI जागरूकता', bg: 'bg-violet-500', shadow: 'shadow-violet-200' },
  { to: '/jobs', icon: Briefcase, label: 'Find Jobs', labelHi: 'नौकरी खोजें', bg: 'bg-yellow-500', shadow: 'shadow-yellow-200' },
  { to: '/micro-industry', icon: Factory, label: 'My Business', labelHi: 'व्यापार', bg: 'bg-red-500', shadow: 'shadow-red-200' },
];

const recentActivity = [
  { icon: '✅', text: 'Carpentry skill verified', time: '2 hours ago', color: 'text-green-600' },
  { icon: '📚', text: 'Joined WhatsApp Business slot', time: '1 day ago', color: 'text-blue-600' },
  { icon: '⭐', text: 'Received 5-star rating from Trainer', time: '3 days ago', color: 'text-yellow-600' },
  { icon: '💰', text: 'Earned ₹350 from training referral', time: '5 days ago', color: 'text-green-600' },
];

export default function Dashboard() {
  const { profile } = useAuth();
  const name = profile?.full_name || 'Friend';
  const village = profile ? `${profile.village}, ${profile.state}` : 'India';

  const stats = [
    { label: 'Skills Added', labelHi: 'स्किल', value: '3', icon: Award, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Learning', labelHi: 'सीख रहे', value: '1', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Sessions', labelHi: 'सेशन', value: '5', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Earnings ₹', labelHi: 'कमाई', value: `₹${profile?.earnings_this_month || 2350}`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-6 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Namaste, {name}! 🙏
            </h1>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={13} className="text-green-600" />
              <span className="text-xs text-gray-500">{village}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 lg:px-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map(({ label, labelHi, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={18} className={color} />
              </div>
              <p className="text-xl font-bold text-gray-900">{value}</p>
              <p className="text-xs font-medium text-gray-600 mt-0.5">{label}</p>
              <p className="text-xs text-gray-400">{labelHi}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Quick Actions (त्वरित कार्य)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickActions.map(({ to, icon: Icon, label, labelHi, bg, shadow }) => (
              <Link
                key={to}
                to={to}
                className={`${bg} ${shadow} shadow-lg rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-white hover:opacity-90 active:scale-95 transition-all min-h-[90px]`}
              >
                <Icon size={26} className="text-white" />
                <div className="text-center">
                  <p className="text-sm font-bold leading-tight">{label}</p>
                  <p className="text-xs opacity-80">{labelHi}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900">Recent Activity (हाल की गतिविधि)</h2>
            <button className="text-xs text-green-600 font-semibold flex items-center gap-1">View all <ChevronRight size={14} /></button>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3.5">
                <span className="text-xl mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-medium leading-snug">{item.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-5 text-white">
          <p className="text-xs font-semibold opacity-80 mb-1">Trust Score (विश्वास स्कोर)</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{profile?.trust_score || 72}<span className="text-lg font-medium opacity-70">/100</span></p>
              <p className="text-sm opacity-80 mt-1">Keep learning to improve!</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-70">Complete your profile to reach 100</p>
              <div className="mt-2 w-32 h-2 bg-green-700 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${profile?.trust_score || 72}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
