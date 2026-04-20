import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, Lock, Sprout, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { INDIAN_STATES } from '../data/mockData';

export default function Register() {
  const [form, setForm] = useState({ fullName: '', mobile: '', village: '', state: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const { lang, toggleLang, t } = useAppContext();
  const navigate = useNavigate();

  const h = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.mobile.length !== 10) {
      setError(lang === 'hi' ? '10 अंकों का मोबाइल नंबर दर्ज करें।' : 'Enter a valid 10-digit mobile number.');
      return;
    }
    if (!/^[6-9]/.test(form.mobile)) {
      setError(lang === 'hi' ? 'मोबाइल 6-9 से शुरू होना चाहिए।' : 'Mobile must start with 6, 7, 8, or 9.');
      return;
    }
    if (form.password.length < 6) {
      setError(lang === 'hi' ? 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए।' : 'Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await register({ fullName: form.fullName, mobile: form.mobile, password: form.password, village: form.village, state: form.state });
      navigate('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Registration failed';
      setError(msg.includes('already') ? (lang === 'hi' ? 'यह मोबाइल नंबर पहले से रजिस्टर है।' : 'This mobile number is already registered.') : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm animate-slide-up">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="text-sm text-green-600 font-semibold hover:underline">← {lang === 'hi' ? 'होम' : 'Home'}</Link>
          <button onClick={toggleLang} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold text-gray-700 transition">
            {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
          </button>
        </div>

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Sprout className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">{t('registerTitle')}</h1>
          <p className="text-sm text-gray-500 mt-1">{lang === 'hi' ? 'मुफ्त में खाता बनाएं' : 'Create your free account'}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3 animate-fade-in">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('fullName')}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input name="fullName" value={form.fullName} onChange={h} placeholder={lang === 'hi' ? 'आपका पूरा नाम' : 'Your full name'} className="input-field pl-9" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('mobileNumber')}</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input name="mobile" value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                  type="tel" placeholder="9876543210" className="input-field pl-9" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('village')}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input name="village" value={form.village} onChange={h} placeholder={lang === 'hi' ? 'गाँव / शहर का नाम' : 'Village or town name'} className="input-field pl-9" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('selectState')}</label>
              <div className="relative">
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                <select name="state" value={form.state} onChange={h} className="input-field appearance-none pr-9" required>
                  <option value="">{lang === 'hi' ? 'राज्य चुनें' : 'Choose your state'}</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input name="password" value={form.password} onChange={h} type={showPw ? 'text' : 'password'}
                  placeholder={lang === 'hi' ? 'कम से कम 6 अक्षर' : 'Min. 6 characters'} className="input-field pl-9 pr-10" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all disabled:opacity-60 shadow-sm hover:shadow-md active:scale-95 mt-1">
              {loading ? (lang === 'hi' ? 'खाता बन रहा है...' : 'Creating account...') : t('registerTitle')}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            {lang === 'hi' ? 'पहले से खाता है? ' : 'Already have an account? '}
            <Link to="/login" className="text-green-600 font-bold hover:underline">{t('loginBtn')}</Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">© 2025 SkillGrow India · ग्रामीण भारत के लिए ❤️</p>
      </div>
    </div>
  );
}
