import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Bell, Globe, LogOut, Star, Award, Edit2, Phone, Shield, ChevronRight, Camera, TrendingUp, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const { lang, toggleLang, t } = useAppContext();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const name = user?.fullName || 'User';
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const location = user ? `${user.village}, ${user.state}` : 'India';
  const trustScore = user?.trustScore || 72;
  const skills = user?.skills || [
    { skillName: 'Carpentry', category: 'Farming', status: 'verified' },
    { skillName: 'Digital Marketing', category: 'Digital', status: 'verified' },
    { skillName: 'Organic Farming', category: 'Farming', status: 'pending' },
  ];

  const handleLogout = () => {
    if (confirmLogout) { logout(); }
    else { setConfirmLogout(true); setTimeout(() => setConfirmLogout(false), 3000); }
  };

  const menuItems = [
    { icon: TrendingUp, en: 'My Progress', hi: 'मेरी प्रगति', sub: lang === 'hi' ? '5 सेशन पूरे किए' : '5 sessions completed', to: '/progress', color: 'text-green-600', bg: 'bg-green-50' },
    { icon: BookOpen, en: 'Learning History', hi: 'सीखने का इतिहास', sub: lang === 'hi' ? '3 स्किल सीखी' : '3 skills learned', to: '/learn', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Award, en: 'My Badges', hi: 'मेरे बैज', sub: lang === 'hi' ? '2 बैज अर्जित' : '2 badges earned', to: '/progress', color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: Shield, en: 'Safety Center', hi: 'सुरक्षा केंद्र', sub: lang === 'hi' ? 'डिजिटल सुरक्षा सीखें' : 'Learn digital safety', to: '/safety', color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl p-6 text-white shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center border-2 border-white/30">
                <span className="text-white font-black text-2xl">{initials}</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow cursor-pointer hover:bg-gray-100 transition">
                <Camera size={12} className="text-green-600" />
              </div>
            </div>
            <div>
              <h2 className="font-black text-lg leading-tight">{name}</h2>
              <div className="flex items-center gap-1 mt-1 opacity-90">
                <MapPin size={13} />
                <span className="text-sm">{location}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 opacity-90">
                <Phone size={13} />
                <span className="text-sm">{user?.mobile || '—'}</span>
              </div>
            </div>
          </div>
          <button className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition">
            <Edit2 size={15} className="text-white" />
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/20">
          {[
            { val: skills.length, en: 'Skills', hi: 'स्किल' },
            { val: 5, en: 'Sessions', hi: 'सेशन' },
            { val: `${trustScore}`, en: 'Trust Score', hi: 'विश्वास' },
          ].map(({ val, en, hi }) => (
            <div key={en} className="text-center">
              <p className="text-2xl font-black">{val}</p>
              <p className="text-xs opacity-75 mt-0.5">{lang === 'hi' ? hi : en}</p>
            </div>
          ))}
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => <Star key={i} size={12} className={i <= 4 ? 'text-yellow-300 fill-yellow-300' : 'text-white/30'} />)}
          </div>
          <span className="text-sm opacity-80">4.6 {lang === 'hi' ? 'रेटिंग' : 'rating'}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Award size={15} className="text-green-600" />
            {lang === 'hi' ? 'मेरी स्किल्स' : 'My Skills'}
          </h3>
          <Link to="/add-skill" className="text-xs text-green-600 font-semibold hover:underline">
            {lang === 'hi' ? '+ जोड़ें' : '+ Add'}
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((sk, i) => (
            <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              sk.status === 'verified' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
            }`}>
              {sk.skillName}
              {sk.status === 'verified' ? ' ✓' : ' ⏳'}
            </span>
          ))}
          <Link to="/add-skill" className="px-3 py-1.5 bg-gray-50 text-gray-400 rounded-full text-xs font-medium border border-dashed border-gray-200 hover:border-green-300 hover:text-green-600 transition">
            + {lang === 'hi' ? 'स्किल जोड़ें' : 'Add Skill'}
          </Link>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {menuItems.map(({ icon: Icon, en, hi, sub, to, color, bg }, i) => (
          <Link key={en} to={to} className={`flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition ${i < menuItems.length - 1 ? 'border-b border-gray-50' : ''}`}>
            <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Icon size={16} className={color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{lang === 'hi' ? hi : en}</p>
              <p className="text-xs text-gray-500">{sub}</p>
            </div>
            <ChevronRight size={15} className="text-gray-300 flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h3 className="text-sm font-bold text-gray-900 mb-3">{lang === 'hi' ? 'सेटिंग्स' : 'Settings'}</h3>

        <div className="space-y-1">
          {/* Language */}
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <Globe size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{lang === 'hi' ? 'भाषा' : 'Language'}</p>
                <p className="text-xs text-gray-500">{lang === 'hi' ? 'वर्तमान: हिंदी' : 'Current: English'}</p>
              </div>
            </div>
            <button onClick={toggleLang} className="flex bg-gray-100 rounded-xl p-0.5">
              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${lang === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>EN</span>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${lang === 'hi' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}>हिं</span>
            </button>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                <Bell size={16} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{lang === 'hi' ? 'सूचनाएं' : 'Notifications'}</p>
                <p className="text-xs text-gray-500">{notifications ? (lang === 'hi' ? 'चालू' : 'Enabled') : (lang === 'hi' ? 'बंद' : 'Disabled')}</p>
              </div>
            </div>
            <button onClick={() => setNotifications(!notifications)}
              className={`relative w-11 h-6 rounded-full transition-colors ${notifications ? 'bg-green-500' : 'bg-gray-200'}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifications ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Logout */}
      <button onClick={handleLogout}
        className={`w-full py-3.5 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 transition border ${
          confirmLogout
            ? 'bg-red-600 border-red-600 text-white hover:bg-red-700'
            : 'bg-red-50 hover:bg-red-100 text-red-600 border-red-100'
        }`}>
        <LogOut size={16} />
        {confirmLogout ? (lang === 'hi' ? '⚠️ क्लिक करें — लॉगआउट होगा' : '⚠️ Click again to confirm logout') : t('signOut')}
      </button>
    </div>
  );
}
