import { Award, CheckCircle, Lock, TrendingUp, BookOpen, Clock, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const GROWTH_STEPS = [
  { step: 1, title: 'Core Skill', titleHi: 'मूल स्किल', desc: 'Learned 1 core skill', status: 'done', color: 'bg-green-500', textColor: 'text-green-700', bg: 'bg-green-50' },
  { step: 2, title: 'Tool Upgrade', titleHi: 'टूल अपग्रेड', desc: 'Learning digital tools', status: 'progress', color: 'bg-blue-500', textColor: 'text-blue-700', bg: 'bg-blue-50' },
  { step: 3, title: 'AI Skills', titleHi: 'AI स्किल्स', desc: 'Complete Tool Upgrade first', status: 'locked', color: 'bg-gray-300', textColor: 'text-gray-500', bg: 'bg-gray-50' },
  { step: 4, title: 'Business Owner', titleHi: 'व्यापार मालिक', desc: 'Complete all steps', status: 'locked', color: 'bg-gray-300', textColor: 'text-gray-500', bg: 'bg-gray-50' },
];

const BADGES = [
  { icon: '🏅', name: 'First Skill', desc: 'Added first skill', earned: true },
  { icon: '📚', name: 'Quick Learner', desc: 'Joined 3 sessions', earned: true },
  { icon: '⭐', name: 'Top Rated', desc: '4.5+ rating', earned: false },
  { icon: '💼', name: 'Job Ready', desc: 'Profile complete', earned: false },
  { icon: '🤖', name: 'AI Pioneer', desc: 'AI course done', earned: false },
  { icon: '🏆', name: 'Business Star', desc: 'Group business started', earned: false },
];

const SESSIONS = [
  { skill: 'Carpentry Basics', trainer: 'Ramesh Kumar', date: '10 Jan 2025', duration: '7 days', status: 'Completed' },
  { skill: 'WhatsApp Business', trainer: 'Amit Verma', date: '01 Jan 2025', duration: '3 days', status: 'Completed' },
  { skill: 'Organic Farming', trainer: 'Dinesh Patel', date: '20 Jan 2025', duration: '15 days', status: 'Active' },
];

export default function Progress() {
  const { profile } = useAuth();

  const statsData = [
    { label: 'Skills Learned', labelHi: 'सीखी स्किल', value: '3', icon: Award, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Sessions Done', labelHi: 'सेशन पूरे', value: '5', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'This Month', labelHi: 'इस महीने', value: `₹${profile?.earnings_this_month || 2350}`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Trust Score', labelHi: 'विश्वास स्कोर', value: `${profile?.trust_score || 72}`, icon: DollarSign, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-6 sticky top-0 z-20">
        <h1 className="text-lg font-bold text-gray-900">My Journey</h1>
        <p className="text-xs text-gray-500">मेरी यात्रा</p>
      </div>

      <div className="px-4 py-5 lg:px-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statsData.map(({ label, labelHi, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
              <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <Icon size={18} className={color} />
              </div>
              <p className="text-xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-600 mt-0.5">{label}</p>
              <p className="text-xs text-gray-400">{labelHi}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-4">Growth Path (विकास पथ)</h2>
          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-100 z-0" />
            <div className="space-y-4 relative z-10">
              {GROWTH_STEPS.map(step => (
                <div key={step.step} className={`flex items-start gap-4 ${step.bg} rounded-2xl p-4 border ${step.status === 'locked' ? 'border-gray-100 opacity-60' : 'border-transparent'}`}>
                  <div className={`w-12 h-12 ${step.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    {step.status === 'done' ? <CheckCircle size={22} className="text-white" /> :
                      step.status === 'progress' ? <Clock size={22} className="text-white animate-pulse" /> :
                        <Lock size={22} className="text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className={`font-bold text-sm ${step.textColor}`}>Step {step.step}: {step.title}</p>
                        <p className="text-xs text-gray-500">{step.titleHi}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${step.status === 'done' ? 'bg-green-100 text-green-700' : step.status === 'progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                        {step.status === 'done' ? 'Done' : step.status === 'progress' ? 'In Progress' : 'Locked'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Badges Earned (बैज)</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {BADGES.map((badge, i) => (
              <div key={i} className={`flex flex-col items-center gap-2 p-3 rounded-2xl border text-center ${badge.earned ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-100 opacity-40'}`}>
                <span className="text-2xl">{badge.icon}</span>
                <p className="text-xs font-bold text-gray-800 leading-tight">{badge.name}</p>
                <p className="text-xs text-gray-500 leading-tight">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Session History (सेशन इतिहास)</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Skill', 'Trainer', 'Date', 'Duration', 'Status'].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {SESSIONS.map((s, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium text-gray-900">{s.skill}</td>
                      <td className="px-4 py-3 text-gray-600">{s.trainer}</td>
                      <td className="px-4 py-3 text-gray-600">{s.date}</td>
                      <td className="px-4 py-3 text-gray-600">{s.duration}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full font-semibold ${s.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{s.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
