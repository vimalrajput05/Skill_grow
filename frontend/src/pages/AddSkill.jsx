import { useState, useEffect, useRef } from 'react';
import { Upload, CheckCircle, PlusCircle, Image, Video, X, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { skillsAPI } from '../services/api';
import { SKILL_CATEGORIES } from '../data/mockData';

const STATUS_STYLES = {
  verified: 'bg-green-50 text-green-700 border-green-100',
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
};

export default function AddSkill() {
  const { user } = useAuth();
  const { lang } = useAppContext();
  const [form, setForm] = useState({ skillName: '', category: '', description: '' });
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const photoRef = useRef(null);
  const videoRef = useRef(null);

  const loadSkills = async () => {
    if (!user) return;
    try {
      const res = await skillsAPI.getMySkills();
      setSkills(Array.isArray(res.data?.data || res.data) ? (res.data?.data || res.data) : []);
    } catch { setSkills([]); }
  };

  useEffect(() => { loadSkills(); }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await skillsAPI.addMySkill({ ...form, userId: user.id });
      setSuccess(true);
      setForm({ skillName: '', category: '', description: '' });
      setPhotoPreview(null);
      setVideoPreview(null);
      loadSkills();
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      alert(lang === 'hi' ? 'स्किल जोड़ने में समस्या हुई। दोबारा कोशिश करें।' : 'Failed to add skill. Please try again.');
    } finally { setLoading(false); }
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const handleVideo = (e) => {
    const file = e.target.files?.[0];
    if (file) setVideoPreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl font-black text-gray-900">{lang === 'hi' ? 'अपनी स्किल जोड़ें' : 'Add Your Skill'}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{lang === 'hi' ? 'अपनी स्किल जोड़कर काम पाएं' : 'Showcase your skills and get hired'}</p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
          <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
          <p className="text-sm font-semibold text-green-800">
            {lang === 'hi' ? '✅ स्किल जोड़ी गई! सत्यापन जल्द होगा।' : '✅ Skill added! It will be verified soon.'}
          </p>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
          <PlusCircle size={16} className="text-green-600" />
          {lang === 'hi' ? 'नई स्किल की जानकारी' : 'New Skill Details'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {lang === 'hi' ? 'स्किल का नाम *' : 'Skill Name *'}
            </label>
            <input value={form.skillName} onChange={e => setForm(p => ({ ...p, skillName: e.target.value }))}
              placeholder={lang === 'hi' ? 'जैसे: बढ़ईगीरी, सिलाई, डिजिटल मार्केटिंग' : 'e.g. Carpentry, Sewing, Digital Marketing'}
              className="input-field" required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {lang === 'hi' ? 'श्रेणी *' : 'Category *'}
            </label>
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
              className="input-field appearance-none" required>
              <option value="">{lang === 'hi' ? 'श्रेणी चुनें' : 'Select a category'}</option>
              {SKILL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {lang === 'hi' ? 'विवरण' : 'Description'} <span className="text-gray-400 font-normal">({lang === 'hi' ? 'वैकल्पिक' : 'Optional'})</span>
            </label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder={lang === 'hi' ? 'इस स्किल में अपने अनुभव के बारे में लिखें...' : 'Describe your experience with this skill...'}
              className="input-field resize-none" rows={3} />
          </div>

          {/* Photo upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              📸 {lang === 'hi' ? 'फोटो प्रमाण' : 'Photo Proof'} <span className="text-gray-400 font-normal">({lang === 'hi' ? 'वैकल्पिक' : 'Optional'})</span>
            </label>
            <input ref={photoRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
            {photoPreview ? (
              <div className="relative inline-block">
                <img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover rounded-xl border border-gray-200" />
                <button type="button" onClick={() => { setPhotoPreview(null); photoRef.current.value = ''; }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition">
                  <X size={12} />
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => photoRef.current?.click()}
                className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-green-300 hover:text-green-600 transition w-full justify-center">
                <Camera size={18} />
                {lang === 'hi' ? 'फोटो अपलोड करें' : 'Upload Photo'}
              </button>
            )}
          </div>

          {/* Video upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              🎥 {lang === 'hi' ? 'वीडियो प्रमाण' : 'Video Proof'} <span className="text-gray-400 font-normal">({lang === 'hi' ? 'वैकल्पिक' : 'Optional'})</span>
            </label>
            <input ref={videoRef} type="file" accept="video/*" onChange={handleVideo} className="hidden" />
            {videoPreview ? (
              <div className="relative inline-block w-full">
                <video src={videoPreview} controls className="w-full rounded-xl border border-gray-200 max-h-48" />
                <button type="button" onClick={() => { setVideoPreview(null); videoRef.current.value = ''; }}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition">
                  <X size={13} />
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => videoRef.current?.click()}
                className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-green-300 hover:text-green-600 transition w-full justify-center">
                <Video size={18} />
                {lang === 'hi' ? 'वीडियो अपलोड करें' : 'Upload Video'}
              </button>
            )}
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all disabled:opacity-60 shadow-sm hover:shadow-md active:scale-95">
            {loading
              ? (lang === 'hi' ? 'जोड़ा जा रहा है...' : 'Adding skill...')
              : (lang === 'hi' ? '+ स्किल जोड़ें' : '+ Add Skill')}
          </button>
        </form>
      </div>

      {/* My Skills List */}
      {skills.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-3">
            {lang === 'hi' ? '📋 मेरी स्किल्स' : '📋 My Skills'}
          </h2>
          <div className="space-y-2">
            {skills.map((sk, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{sk.skillName}</p>
                  <p className="text-xs text-gray-500">{sk.category}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${STATUS_STYLES[sk.status] || STATUS_STYLES.pending}`}>
                  {sk.status === 'verified'
                    ? (lang === 'hi' ? '✓ सत्यापित' : '✓ Verified')
                    : (lang === 'hi' ? '⏳ लंबित' : '⏳ Pending')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
