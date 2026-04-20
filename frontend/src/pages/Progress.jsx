import { Award, CheckCircle, Lock, TrendingUp, BookOpen, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

const GROWTH_STEPS = [
  { step: 1, en: 'Core Skill', hi: 'मूल स्किल', desc_en: 'Learned 1 core skill', desc_hi: '1 मूल स्किल सीखी', status: 'done' },
  { step: 2, en: 'Tool Upgrade', hi: 'टूल अपग्रेड', desc_en: 'Learning digital tools', desc_hi: 'डिजिटल टूल्स सीख रहे', status: 'progress' },
  { step: 3, en: 'AI Skills', hi: 'AI स्किल्स', desc_en: 'Complete Tool Upgrade first', desc_hi: 'पहले टूल अपग्रेड पूरा करें', status: 'locked' },
  { step: 4, en: 'Business Owner', hi: 'व्यापार मालिक', desc_en: 'Complete all steps', desc_hi: 'सभी चरण पूरे करें', status: 'locked' },
];

const BADGES = [
  { icon: '🏅', en: 'First Skill', hi: 'पहली स्किल', earned: true },
  { icon: '📚', en: 'Quick Learner', hi: 'तेज सीखने वाले', earned: true },
  { icon: '⭐', en: 'Top Rated', hi: 'टॉप रेटेड', earned: false },
  { icon: '💼', en: 'Job Ready', hi: 'जॉब रेडी', earned: false },
  { icon: '🤖', en: 'AI Pioneer', hi: 'AI पायोनियर', earned: false },
  { icon: '🏆', en: 'Business Star', hi: 'बिज़नेस स्टार', earned: false },
];

const SESSIONS = [
  { skill: 'Carpentry Basics', skill_hi: 'बढ़ईगीरी बेसिक्स', trainer: 'Ramesh Kumar', date: '10 Jan 2025', duration: '7 days', status: 'completed' },
  { skill: 'WhatsApp Business', skill_hi: 'व्हाट्सएप बिज़नेस', trainer: 'Amit Verma', date: '01 Jan 2025', duration: '3 days', status: 'completed' },
  { skill: 'Organic Farming', skill_hi: 'जैविक खेती', trainer: 'Dinesh Patel', date: '20 Jan 2025', duration: '15 days', status: 'active' },
];

export default function Progress() {
  const { user } = useAuth();
  const { lang } = useAppContext();
  const trustScore = user?.trustScore || 72;
  const earnings = user?.earningsThisMonth || 2350;

  const stats = [
    { en: 'Skills Learned', hi: 'स्किल सीखी', value: '3', icon: Award, color: 'text-green-600', bg: 'bg-green-50' },
    { en: 'Sessions Done', hi: 'सेशन पूरे', value: '5', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { en: 'Earned This Month', hi: 'इस महीने कमाई', value: `₹${earnings}`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { en: 'Trust Score', hi: 'विश्वास स्कोर', value: String(trustScore), icon: DollarSign, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl font-black text-gray-900">{lang === 'hi' ? 'मेरी यात्रा' : 'My Journey'}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{lang === 'hi' ? 'अपनी प्रगति देखें' : 'Track your progress'}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ en, hi, value, icon: Icon, color, bg }) => (
          <div key={en} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-600 mt-0.5 font-medium">{lang === 'hi' ? hi : en}</p>
          </div>
        ))}
      </div>

      {/* Growth Path */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">{lang === 'hi' ? '🛤️ विकास पथ' : '🛤️ Growth Path'}</h2>
        <div className="space-y-3">
          {GROWTH_STEPS.map((step, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${
              step.status === 'done' ? 'bg-green-50' : step.status === 'progress' ? 'bg-blue-50' : 'bg-gray-50'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${
                step.status === 'done' ? 'bg-green-500' : step.status === 'progress' ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                {step.status === 'done' ? <CheckCircle size={16} className="text-white" /> :
                 step.status === 'progress' ? <span className="text-white font-bold">{step.step}</span> :
                 <Lock size={14} className="text-white" />}
              </div>
              <div>
                <p className={`text-sm font-bold ${step.status === 'locked' ? 'text-gray-400' : 'text-gray-900'}`}>
                  {lang === 'hi' ? step.hi : step.en}
                </p>
                <p className={`text-xs mt-0.5 ${step.status === 'locked' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {lang === 'hi' ? step.desc_hi : step.desc_en}
                </p>
              </div>
              {step.status === 'progress' && (
                <span className="ml-auto text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                  {lang === 'hi' ? 'जारी' : 'Active'}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">{lang === 'hi' ? '🏅 मेरे बैज' : '🏅 My Badges'}</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {BADGES.map((b, i) => (
            <div key={i} className={`flex flex-col items-center gap-1 p-3 rounded-xl text-center ${b.earned ? 'bg-yellow-50 border border-yellow-100' : 'bg-gray-50 border border-gray-100 opacity-50'}`}>
              <span className="text-2xl">{b.icon}</span>
              <p className="text-xs font-semibold text-gray-700 leading-tight">{lang === 'hi' ? b.hi : b.en}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sessions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-4">{lang === 'hi' ? '📅 ट्रेनिंग सेशन' : '📅 Training Sessions'}</h2>
        <div className="space-y-3">
          {SESSIONS.map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm font-semibold text-gray-900">{lang === 'hi' ? s.skill_hi : s.skill}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.trainer} · {s.date} · {s.duration}</p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                s.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {s.status === 'completed'
                  ? (lang === 'hi' ? '✓ पूर्ण' : '✓ Done')
                  : (lang === 'hi' ? '● जारी' : '● Active')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
