import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Lock, Sprout, Eye, EyeOff, Sun, Moon, Volume2, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import LanguageToggle from '../components/ui/LanguageToggle';
import VoiceButton from '../components/ui/VoiceButton';
import HelpModal from '../components/ui/HelpModal';
import { useVoice } from '../hooks/useVoice';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const { login } = useAuth();
  const { t, darkMode, toggleDarkMode } = useAppContext();
  const navigate = useNavigate();
  const { speak } = useVoice();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(mobile, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-8">
          <Link to="/landing" className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors">
            ← {t('dashboard')}
          </Link>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        <div className="text-center mb-12 animate-slide-up">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl glass">
            <Sprout className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-black dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-4">
            {t('loginTitle')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            {t('mobileNumber')} + {t('password')}
          </p>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sprout className="w-9 h-9 text-white" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-8 glass mb-8">
          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm rounded-2xl px-5 py-4 animate-fade-in">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('mobileNumber')}
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  placeholder="9876543210"
                  maxLength="10"
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-lg focus:ring-4 focus:ring-green-500 focus:border-transparent transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="******"
                  className="w-full pl-12 pr-14 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-lg focus:ring-4 focus:ring-green-500 focus:border-transparent transition-all shadow-sm"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPw(!showPw)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black text-lg rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:shadow-none"
            >
              {loading ? 'लॉगिन हो रहा है... Logging in...' : t('loginBtn')}
            </button>
          </form>

          <p className="text-center py-6">
            <Link to="/register" className="text-lg font-semibold text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors">
              {t('registerTitle')} →
            </Link>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <VoiceButton text={`${t('loginTitle')}. Enter 10-digit mobile number and password. Press Login button. ${t('mobileNumber')} ${t('password')}`} size="md" />
          <button
            onClick={() => setShowHelp(true)}
            className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-all"
            title="Help instructions"
          >
            <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8 animate-fade-in">
          © 2025 SkillGrow India | ग्रामीण भारत के लिए ❤️
        </p>
      </div>

      <HelpModal pageId="login" isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <VoiceButton />
    </div>
  );
}

// export default Login;
