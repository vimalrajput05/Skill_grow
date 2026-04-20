import { useState } from 'react';
import { Star, MapPin, Briefcase, Phone, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { MOCK_JOB_SEEKERS } from '../data/mockData';

const JOB_LISTINGS = [
  { id: 1, title: 'Carpenter Needed', title_hi: 'बढ़ई चाहिए', company: 'Delhi Furniture Co.', location: 'Delhi', salary: '₹15,000/month', type: 'Full Time', skills: ['Carpentry'] },
  { id: 2, title: 'Embroidery Worker', title_hi: 'कढ़ाई कार्यकर्ता', company: 'Jaipur Handicrafts', location: 'Rajasthan', salary: '₹8,000/month', type: 'Part Time', skills: ['Sewing', 'Embroidery'] },
  { id: 3, title: 'Digital Marketing Executive', title_hi: 'डिजिटल मार्केटिंग', company: 'Online (Remote)', location: 'Remote', salary: '₹12,000/month', type: 'Remote', skills: ['Digital', 'WhatsApp'] },
  { id: 4, title: 'Farm Manager', title_hi: 'फार्म मैनेजर', company: 'Agri Plus Farm', location: 'UP', salary: '₹18,000/month', type: 'Full Time', skills: ['Farming'] },
  { id: 5, title: 'Solar Technician', title_hi: 'सोलर तकनीशियन', company: 'GreenEnergy Ltd', location: 'Maharashtra', salary: '₹20,000/month', type: 'Full Time', skills: ['Solar', 'Technical'] },
];

export default function Jobs() {
  const { user } = useAuth();
  const { lang } = useAppContext();
  const [tab, setTab] = useState('find');
  const [applied, setApplied] = useState(new Set());
  const [form, setForm] = useState({ name: '', skill: '', location: '', pay: '', contact: '' });
  const [posted, setPosted] = useState(false);

  const handleApply = (id) => {
    setApplied(prev => new Set([...prev, id]));
    setTimeout(() => {}, 0);
  };

  const handlePost = (e) => {
    e.preventDefault();
    setPosted(true);
    setForm({ name: '', skill: '', location: '', pay: '', contact: '' });
    setTimeout(() => setPosted(false), 4000);
  };

  const typeColors = { 'Full Time': 'bg-green-100 text-green-700', 'Part Time': 'bg-blue-100 text-blue-700', 'Remote': 'bg-purple-100 text-purple-700' };

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div>
        <h1 className="text-xl font-black text-gray-900">{lang === 'hi' ? 'नौकरी बोर्ड' : 'Job Board'}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{lang === 'hi' ? 'नौकरी खोजें या भर्ती पोस्ट करें' : 'Find jobs or post hiring listings'}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
        {[
          { key: 'find', en: '🔍 Find Jobs', hi: '🔍 नौकरी खोजें' },
          { key: 'seekers', en: '👥 Job Seekers', hi: '👥 जॉब चाहने वाले' },
          { key: 'post', en: '📢 Post Hiring', hi: '📢 भर्ती पोस्ट करें' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${tab === t.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {lang === 'hi' ? t.hi : t.en}
          </button>
        ))}
      </div>

      {/* Find Jobs */}
      {tab === 'find' && (
        <div className="space-y-3">
          {JOB_LISTINGS.map(job => (
            <div key={job.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-start gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900">{lang === 'hi' ? job.title_hi : job.title}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[job.type]}`}>{job.type}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{job.company}</p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={12} /> {job.location}</span>
                    <span className="text-xs font-bold text-green-600">{job.salary}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {job.skills.map(s => <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>)}
                  </div>
                </div>
                <button onClick={() => handleApply(job.id)} disabled={applied.has(job.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition active:scale-95 ${
                    applied.has(job.id) ? 'bg-green-100 text-green-700' : 'bg-green-600 hover:bg-green-700 text-white shadow-sm'
                  }`}>
                  {applied.has(job.id) ? (lang === 'hi' ? '✓ आवेदन किया' : '✓ Applied') : (lang === 'hi' ? 'आवेदन करें' : 'Apply')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Job Seekers */}
      {tab === 'seekers' && (
        <div className="grid sm:grid-cols-2 gap-4">
          {(MOCK_JOB_SEEKERS || []).slice(0, 6).map((seeker, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-green-700 text-sm">
                    {seeker.name?.split(' ').map(n => n[0]).join('').slice(0,2) || 'US'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{seeker.name || 'User'}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{seeker.skill || seeker.skills || 'Multiple Skills'}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin size={10} /> {seeker.location || 'India'}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} size={11} className={s <= (seeker.rating || 4) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />)}
                </div>
                <button className="flex items-center gap-1.5 text-xs font-bold text-green-600 hover:underline">
                  <Phone size={11} /> {lang === 'hi' ? 'संपर्क करें' : 'Contact'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Post Hiring */}
      {tab === 'post' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-4">{lang === 'hi' ? '📢 भर्ती पोस्ट करें' : '📢 Post a Hiring'}</h2>
          {posted && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2 animate-fade-in">
              <CheckCircle size={18} className="text-green-600" />
              <p className="text-sm font-semibold text-green-800">{lang === 'hi' ? 'भर्ती पोस्ट हो गई!' : 'Hiring posted successfully!'}</p>
            </div>
          )}
          <form onSubmit={handlePost} className="space-y-3.5">
            {[
              { key: 'name', en: 'Job Title', hi: 'नौकरी का नाम', ph_en: 'e.g. Carpenter Needed', ph_hi: 'जैसे: बढ़ई चाहिए' },
              { key: 'skill', en: 'Required Skill', hi: 'आवश्यक स्किल', ph_en: 'e.g. Carpentry', ph_hi: 'जैसे: बढ़ईगीरी' },
              { key: 'location', en: 'Location', hi: 'स्थान', ph_en: 'City, State', ph_hi: 'शहर, राज्य' },
              { key: 'pay', en: 'Salary / Pay', hi: 'वेतन', ph_en: 'e.g. ₹12,000/month', ph_hi: 'जैसे: ₹12,000/माह' },
              { key: 'contact', en: 'Contact Number', hi: 'संपर्क नंबर', ph_en: 'Your mobile number', ph_hi: 'आपका मोबाइल नंबर' },
            ].map(({ key, en, hi, ph_en, ph_hi }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{lang === 'hi' ? hi : en}</label>
                <input value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  placeholder={lang === 'hi' ? ph_hi : ph_en} className="input-field" required />
              </div>
            ))}
            <button type="submit" className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition active:scale-95 shadow-sm flex items-center justify-center gap-2">
              <Send size={16} /> {lang === 'hi' ? 'पोस्ट करें' : 'Post Hiring'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
