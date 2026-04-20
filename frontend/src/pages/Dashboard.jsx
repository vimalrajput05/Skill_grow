import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, BookOpen, Users, Sparkles, Briefcase, Factory, ChevronRight, TrendingUp, Award, Clock, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

const quickActions = [
  { to: '/add-skill', icon: PlusCircle, en: 'Add Skill', hi: 'स्किल जोड़ें', bg: 'bg-green-500' },
  { to: '/learn', icon: BookOpen, en: 'Learn Skill', hi: 'स्किल सीखें', bg: 'bg-blue-500' },
  { to: '/trainers', icon: Users, en: 'Find Trainer', hi: 'ट्रेनर खोजें', bg: 'bg-orange-500' },
  { to: '/ai-awareness', icon: Sparkles, en: 'AI Awareness', hi: 'AI जागरूकता', bg: 'bg-violet-500' },
  { to: '/jobs', icon: Briefcase, en: 'Find Jobs', hi: 'नौकरी खोजें', bg: 'bg-yellow-500' },
  { to: '/micro-industry', icon: Factory, en: 'My Business', hi: 'माइक्रो उद्योग', bg: 'bg-red-500' },
];

const recentActivity = [
  { icon: '✅', text: 'Carpentry skill verified', textHi: 'बढ़ईगीरी स्किल सत्यापित', time: '2 hours ago', timeHi: '2 घंटे पहले' },
  { icon: '📚', text: 'Joined WhatsApp Business slot', textHi: 'व्हाट्सएप बिज़नेस स्लॉट जॉइन किया', time: '1 day ago', timeHi: '1 दिन पहले' },
  { icon: '⭐', text: 'Received 5-star rating', textHi: '5 स्टार रेटिंग मिली', time: '3 days ago', timeHi: '3 दिन पहले' },
  { icon: '💰', text: 'Earned ₹350 from referral', textHi: 'रेफरल से ₹350 कमाए', time: '5 days ago', timeHi: '5 दिन पहले' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { lang, t } = useAppContext();
  const [notifOpen, setNotifOpen] = useState(false);

  const name = user?.fullName || (lang === 'hi' ? 'दोस्त' : 'Friend');
  const firstName = name.split(' ')[0];
  const village = user ? `${user.village}, ${user.state}` : 'India';
  const trustScore = user?.trustScore || 72;
  const earnings = user?.earningsThisMonth || 2350;

  const stats = [
    { en: 'Skills Added', hi: 'स्किल जोड़ी', value: user?.skills?.length || 3, icon: Award, color: 'text-green-600', bg: 'bg-green-50' },
    { en: 'Learning', hi: 'सीख रहे', value: 1, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { en: 'Sessions', hi: 'सेशन', value: 5, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { en: 'Earnings', hi: 'कमाई', value: `₹${earnings}`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-5">
      {/* Greeting */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">
              {lang === 'hi' ? `नमस्ते, ${firstName}! 🙏` : `Namaste, ${firstName}! 🙏`}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">📍 {village}</p>
            <p className="text-xs text-green-600 font-medium mt-1">
              {lang === 'hi' ? '✨ आज कुछ नया सीखें!' : '✨ Ready to learn something new today?'}
            </p>
          </div>
          <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="text-white font-black text-xl">
              {name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ en, hi, value, icon: Icon, color, bg }) => (
          <div key={en} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-xs font-semibold text-gray-600 mt-0.5">{lang === 'hi' ? hi : en}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-3">
          {lang === 'hi' ? '⚡ त्वरित कार्य' : '⚡ Quick Actions'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {quickActions.map(({ to, icon: Icon, en, hi, bg }) => (
            <Link key={to} to={to}
              className={`${bg} rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-white hover:opacity-90 active:scale-95 transition-all min-h-[88px] shadow-sm hover:shadow-md`}>
              <Icon size={24} />
              <p className="text-sm font-bold text-center leading-tight">{lang === 'hi' ? hi : en}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Trust Score */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-5 text-white shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold opacity-80">{lang === 'hi' ? 'विश्वास स्कोर' : 'Trust Score'}</p>
            <p className="text-3xl font-black mt-0.5">{trustScore}<span className="text-base font-medium opacity-70">/100</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-70">{lang === 'hi' ? 'स्कोर बढ़ाने के लिए सीखते रहें' : 'Keep learning to improve'}</p>
            <Link to="/progress" className="mt-2 inline-block text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition">
              {lang === 'hi' ? 'विवरण देखें →' : 'View Details →'}
            </Link>
          </div>
        </div>
        <div className="w-full h-2 bg-green-700 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${trustScore}%` }} />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-900">
            {lang === 'hi' ? '🕐 हाल की गतिविधि' : '🕐 Recent Activity'}
          </h2>
          <Link to="/progress" className="text-xs text-green-600 font-semibold flex items-center gap-0.5 hover:underline">
            {lang === 'hi' ? 'सभी देखें' : 'View all'} <ChevronRight size={13} />
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3.5">
              <span className="text-lg mt-0.5 flex-shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 font-medium">{lang === 'hi' ? item.textHi : item.text}</p>
                <p className="text-xs text-gray-400 mt-0.5">{lang === 'hi' ? item.timeHi : item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-blue-900">{lang === 'hi' ? '🎯 नई स्किल सीखें!' : '🎯 Start Learning Today!'}</p>
          <p className="text-xs text-blue-600 mt-0.5">{lang === 'hi' ? '200+ स्किल उपलब्ध हैं' : '200+ skills available for free'}</p>
        </div>
        <Link to="/learn" className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition active:scale-95">
          {lang === 'hi' ? 'सीखें →' : 'Learn →'}
        </Link>
      </div>
    </div>
  );
}
