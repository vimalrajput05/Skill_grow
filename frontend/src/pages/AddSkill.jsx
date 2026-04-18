import { useState, useEffect } from 'react';
import { Upload, CheckCircle, Clock, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { skillsAPI } from '../services/api';
import { SKILL_CATEGORIES } from '../data/mockData';

const CATEGORY_COLORS = {
  Farming: 'bg-green-100 text-green-700', Carpentry: 'bg-amber-100 text-amber-700',
  Sewing: 'bg-pink-100 text-pink-700', Digital: 'bg-blue-100 text-blue-700',
  Business: 'bg-orange-100 text-orange-700', AI: 'bg-violet-100 text-violet-700',
  Safety: 'bg-red-100 text-red-700', Other: 'bg-gray-100 text-gray-700',
};

export default function AddSkill() {
  const { user } = useAuth();
  const [form, setForm] = useState({ skill_name: '', category: '', description: '' });
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const loadSkills = async () => {
    if (!user) return;
    try {
      const res = await skillsAPI.getMySkills(user.id);
      setSkills(Array.isArray(res.data) ? res.data : []);
    } catch { setSkills([]); }
  };

  useEffect(() => { loadSkills(); }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await skillsAPI.addSkill({ ...form, user_id: user.id, status: 'pending' });
      setSuccess(true);
      setForm({ skill_name: '', category: '', description: '' });
      loadSkills();
      setTimeout(() => setSuccess(false), 3000);
    } catch { alert('Failed to add skill. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-6 sticky top-0 z-20">
        <h1 className="text-lg font-bold text-gray-900">Add Your Skill</h1>
        <p className="text-xs text-gray-500">अपनी स्किल जोड़ें</p>
      </div>

      <div className="px-4 py-5 lg:px-6 space-y-6">
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="text-green-600" size={20} />
            <p className="text-sm font-medium text-green-800">Skill added! It will be verified soon. (स्किल जोड़ी गई)</p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><PlusCircle size={16} className="text-green-600" /> New Skill Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Skill Name (स्किल का नाम) *</label>
              <input value={form.skill_name} onChange={e => setForm(p => ({ ...p, skill_name: e.target.value }))} placeholder="e.g. Carpentry, Sewing, Digital Marketing" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category (श्रेणी) *</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white" required>
                <option value="">Select a category</option>
                {SKILL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description (विवरण) <span className="text-gray-400 font-normal">Optional</span></label>
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Briefly describe your experience with this skill..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" rows={3} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-green-300 hover:text-green-600 transition">
                <Upload size={16} /> Photo Proof
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-blue-300 hover:text-blue-600 transition">
                <Upload size={16} /> Video Proof
              </button>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors disabled:opacity-60 text-sm shadow-sm">
              {loading ? 'Adding Skill...' : 'Add Skill (स्किल जोड़ें)'}
            </button>
          </form>
        </div>

        {skills.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3">My Skills (मेरी स्किल्स)</h2>
            <div className="space-y-3">
              {skills.map(skill => (
                <div key={skill.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{skill.skill_name}</p>
                    {skill.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{skill.description}</p>}
                    <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_COLORS[skill.category] || 'bg-gray-100 text-gray-700'}`}>{skill.category}</span>
                  </div>
                  <div className="flex-shrink-0">
                    {skill.status === 'verified' ? (
                      <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <CheckCircle size={12} /> Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <Clock size={12} /> Pending
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length === 0 && !loading && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <PlusCircle size={24} className="text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-600">No skills added yet</p>
            <p className="text-xs text-gray-400 mt-1">Add your first skill to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
