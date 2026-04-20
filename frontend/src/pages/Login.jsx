import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Lock, Eye, EyeOff, Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { lang, toggleLang, t } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (mobile.length !== 10) { setError(lang === 'hi' ? '10 अंकों का मोबाइल नंबर दर्ज करें।' : 'Enter a valid 10-digit mobile number.'); return; }
    setLoading(true);
    try {
      await login(mobile, password);
      navigate('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Login failed';
      setError(msg === 'Invalid mobile or password'
        ? (lang === 'hi' ? 'मोबाइल या पासवर्ड गलत है।' : 'Invalid mobile number or password.')
        : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm animate-slide-up">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="text-sm text-green-600 font-semibold hover:underline">← {lang === 'hi' ? 'होम' : 'Home'}</Link>
          <button onClick={toggleLang} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold text-gray-700 transition">
            {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
          </button>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sprout className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">{t('loginTitle')}</h1>
          <p className="text-sm text-gray-500 mt-1">{lang === 'hi' ? 'अपने खाते में लॉगिन करें' : 'Login to your SkillGrow account'}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3 animate-fade-in">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('mobileNumber')}</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                <input
                  type="tel" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210" maxLength={10}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('password')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                <input
                  type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder={lang === 'hi' ? 'पासवर्ड दर्ज करें' : 'Enter your password'}
                  className="input-field pl-10 pr-10"
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all disabled:opacity-60 shadow-sm hover:shadow-md active:scale-95 mt-2"
            >
              {loading
                ? (lang === 'hi' ? 'लॉगिन हो रहा है...' : 'Logging in...')
                : t('loginBtn')}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            {lang === 'hi' ? 'खाता नहीं है? ' : "Don't have an account? "}
            <Link to="/register" className="text-green-600 font-bold hover:underline">
              {t('registerTitle')}
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2025 SkillGrow India · ग्रामीण भारत के लिए ❤️
        </p>
      </div>
    </div>
  );
}
