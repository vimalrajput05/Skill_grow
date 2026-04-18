import { useState, useEffect } from 'react';
import { Star, Send, MapPin, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { jobsAPI } from '../services/api';
import { MOCK_JOB_SEEKERS } from '../data/mockData';

export default function Jobs() {
  const { user } = useAuth();
  const [tab, setTab] = useState('find');
  const [postings, setPostings] = useState([]);
  const [form, setForm] = useState({ name: '', skill: '', location: '', experience_or_pay: '', contact: '' });
  const [loading, setLoading] = useState(false);
  const [posted, setPosted] = useState(false);

  const loadJobs = async () => {
    try {
      const res = await jobsAPI.getAllJobs('hiring');
      setPostings(Array.isArray(res.data) ? res.data : []);
    } catch { setPostings([]); }
  };

  useEffect(() => { loadJobs(); }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await jobsAPI.postJob({ ...form, posted_by: user.id, type: 'hiring' });
      setPosted(true);
      setForm({ name: '', skill: '', location: '', experience_or_pay: '', contact: '' });
      loadJobs();
      setTimeout(() => setPosted(false), 3000);
    } catch { alert('Failed to post. Please try again.'); }
    finally { setLoading(false); }
  };

  const stars = (rating) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={11} className={i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
    ));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-6 sticky top-0 z-20">
        <h1 className="text-lg font-bold text-gray-900">Job & Hiring Board</h1>
        <p className="text-xs text-gray-500">नौकरी और भर्ती बोर्ड</p>
        <div className="flex gap-2 mt-3">
          {(['find', 'post']).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-full text-sm font-semibold transition ${tab === t ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {t === 'find' ? 'Find Job (नौकरी खोजें)' : 'Post Hiring (भर्ती पोस्ट करें)'}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-5 lg:px-6">
        {tab === 'find' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_JOB_SEEKERS.map(seeker => (
              <div key={seeker.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4">
                <div className={`w-12 h-12 ${seeker.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">{seeker.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm">{seeker.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Briefcase size={12} className="text-gray-400" />
                    <p className="text-xs text-gray-600">{seeker.skill}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={11} className="text-gray-400" />
                    <p className="text-xs text-gray-500">{seeker.location}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Exp: {seeker.experience}</p>
                  <div className="flex items-center gap-1 mt-1">{stars(seeker.rating)}<span className="text-xs text-gray-600 ml-1">{seeker.rating}</span></div>
                  <button className="mt-2 px-4 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition">
                    Contact
                  </button>
                </div>
              </div>
            ))}
            {postings.map(job => (
              <div key={job.id} className="bg-white rounded-2xl border border-green-100 shadow-sm p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{job.name}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">Needs: {job.skill}</p>
                    <div className="flex items-center gap-1 mt-1"><MapPin size={11} className="text-gray-400" /><span className="text-xs text-gray-500">{job.location}</span></div>
                    <p className="text-xs text-gray-600 mt-0.5">Pay: {job.experience_or_pay}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">Hiring</span>
                </div>
                <button className="mt-3 px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition">Contact: {job.contact}</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'post' && (
          <div className="max-w-md mx-auto">
            {posted && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-800 text-sm rounded-xl px-4 py-3 font-medium">
                Hiring posted successfully! (भर्ती सफलतापूर्वक पोस्ट की गई)
              </div>
            )}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><Send size={15} className="text-blue-600" /> Post a Hiring</h2>
              <form onSubmit={handlePost} className="space-y-4">
                {[
                  { key: 'name', label: 'Company / Your Name', placeholder: 'e.g. Ramesh Furniture Works' },
                  { key: 'skill', label: 'Skill Needed (आवश्यक स्किल)', placeholder: 'e.g. Carpentry, Sewing' },
                  { key: 'location', label: 'Location (स्थान)', placeholder: 'e.g. Sambhal, UP' },
                  { key: 'experience_or_pay', label: 'Pay Range (वेतन)', placeholder: 'e.g. ₹8,000-12,000/month' },
                  { key: 'contact', label: 'Contact Info (संपर्क)', placeholder: 'Mobile number or email' },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
value={form[key]}
                  </div>
                ))}
                <button type="submit" disabled={loading} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition disabled:opacity-60 text-sm">
                  {loading ? 'Posting...' : 'Post Hiring (भर्ती पोस्ट करें)'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
