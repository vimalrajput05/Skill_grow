import { Link } from 'react-router-dom';
import { GraduationCap, Users2, Sparkles, TrendingUp, Factory, Shield, Phone, MapPin, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const stats = [
  { number: '200+', en: 'Skills', hi: 'स्किल' },
  { number: '50+', en: 'Trainers', hi: 'ट्रेनर' },
  { number: '10K+', en: 'Users', hi: 'उपयोगकर्ता' },
  { number: '₹8K', en: 'Avg Income', hi: 'औसत कमाई' },
];

const features = [
  { icon: GraduationCap, en: 'Learn Skills', hi: 'स्किल सीखें', desc_en: '200+ practical skills in 8 categories', desc_hi: '8 श्रेणियों में 200+ व्यावहारिक स्किल', color: 'bg-green-500' },
  { icon: Users2, en: 'Live Training', hi: 'लाइव ट्रेनिंग', desc_en: 'Group training with certified trainers', desc_hi: 'प्रमाणित ट्रेनर के साथ ग्रुप ट्रेनिंग', color: 'bg-blue-500' },
  { icon: Sparkles, en: 'AI Ready', hi: 'AI तैयार', desc_en: 'AI tools that boost farm income 40%', desc_hi: 'AI टूल्स से खेती की कमाई 40% बढ़ाएं', color: 'bg-violet-500' },
  { icon: TrendingUp, en: 'Find Jobs', hi: 'नौकरी खोजें', desc_en: 'Local + remote work matching your skills', desc_hi: 'स्किल के अनुसार स्थानीय + ऑनलाइन काम', color: 'bg-orange-500' },
  { icon: Factory, en: 'Micro Business', hi: 'माइक्रो उद्योग', desc_en: 'Form groups, take verified orders', desc_hi: 'ग्रुप बनाएं, वेरिफाइड ऑर्डर लें', color: 'bg-red-500' },
  { icon: Shield, en: 'Safety First', hi: 'सुरक्षा पहले', desc_en: 'Fraud protection + digital safety', desc_hi: 'धोखाधड़ी सुरक्षा + डिजिटल सुरक्षा', color: 'bg-teal-500' },
];

const testimonials = [
  { name: 'Ramesh Kumar', loc: 'Bihar', quote_en: 'Learned digital marketing, now earning ₹12k/month from my village!', quote_hi: 'डिजिटल मार्केटिंग सीखी, गाँव से ₹12k/महीना कमा रहा हूं!', stars: 5, init: 'RK', color: 'bg-green-500' },
  { name: 'Priya Devi', loc: 'UP', quote_en: 'AI crop prediction increased my yield by 35%. Life changing!', quote_hi: 'AI क्रॉप प्रेडिक्शन ने मेरी उपज 35% बढ़ाई। जिंदगी बदल गई!', stars: 5, init: 'PD', color: 'bg-pink-500' },
  { name: 'Sunil Yadav', loc: 'Rajasthan', quote_en: 'Formed a group, got first ₹25k order. Trust score now 92!', quote_hi: 'ग्रुप बनाया, पहला ₹25k ऑर्डर मिला। ट्रस्ट स्कोर 92 हो गया!', stars: 5, init: 'SY', color: 'bg-blue-500' },
];

export default function Landing() {
  const { lang, toggleLang, t } = useAppContext();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-black">SG</span>
            </div>
            <span className="font-black text-gray-900 text-lg">SkillGrow <span className="text-green-600">India</span></span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={toggleLang} className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold text-gray-700 transition">
              {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
            </button>
            <Link to="/login" className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition hidden sm:block">
              {t('loginBtn')}
            </Link>
            <Link to="/register" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold transition shadow-sm hover:shadow-md active:scale-95">
              {lang === 'hi' ? 'मुफ्त शुरू करें' : 'Get Started Free'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16 pb-20 px-4 text-center bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            🌱 {lang === 'hi' ? 'ग्रामीण भारत के लिए' : 'Built for Rural India'}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
            {lang === 'hi' ? (
              <><span className="text-green-600">स्किल सीखो।</span> ट्रेनिंग लो।<br /><span className="text-blue-600">कमाई करो।</span></>
            ) : (
              <><span className="text-green-600">Learn Skills.</span> Get Trained.<br /><span className="text-blue-600">Earn Money.</span></>
            )}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {lang === 'hi'
              ? 'SkillGrow India ग्रामीण प्रतिभा को आधुनिक तकनीक, ट्रेनिंग और असली कमाई से जोड़ता है।'
              : 'SkillGrow India connects rural talent with modern technology, training, and real income opportunities.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-black text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95">
              🚀 {lang === 'hi' ? 'मुफ्त खाता बनाएं' : 'Create Free Account'}
            </Link>
            <Link to="/login" className="px-8 py-4 bg-white border-2 border-gray-200 hover:border-green-300 text-gray-700 font-bold text-lg rounded-2xl hover:shadow-md transition-all">
              {lang === 'hi' ? 'लॉगिन करें →' : 'Login to Account →'}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-green-600">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="text-3xl sm:text-4xl font-black text-white">{s.number}</p>
                <p className="text-green-100 text-sm font-medium mt-1">{lang === 'hi' ? s.hi : s.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            {lang === 'hi' ? 'कैसे काम करता है?' : 'How It Works'}
          </h2>
          <p className="text-gray-500 mb-12">{lang === 'hi' ? '3 आसान चरणों में शुरू करें' : '3 simple steps to get started'}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '1', en: 'Register Free', hi: 'मुफ्त रजिस्टर करें', d_en: 'Create account with mobile number in 2 minutes', d_hi: '2 मिनट में मोबाइल से खाता बनाएं' },
              { n: '2', en: 'Learn & Train', hi: 'सीखें और ट्रेनिंग लें', d_en: 'Join live sessions with certified trainers', d_hi: 'प्रमाणित ट्रेनर के साथ लाइव सेशन जॉइन करें' },
              { n: '3', en: 'Earn Money', hi: 'कमाई करें', d_en: 'Get jobs, orders and business opportunities', d_hi: 'नौकरी, ऑर्डर और व्यापार के अवसर पाएं' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 hover:bg-green-50 hover:shadow-md transition-all">
                <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <span className="text-white font-black text-xl">{step.n}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{lang === 'hi' ? step.hi : step.en}</h3>
                <p className="text-sm text-gray-500 text-center">{lang === 'hi' ? step.d_hi : step.d_en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              {lang === 'hi' ? 'सब कुछ एक जगह' : 'Everything You Need'}
            </h2>
            <p className="text-gray-500">{lang === 'hi' ? 'सीखने से कमाई तक, पूरा प्लेटफॉर्म' : 'Complete skill-to-income platform'}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:border-green-100 transition-all group">
                <div className={`w-11 h-11 ${f.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                  <f.icon size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1.5">{lang === 'hi' ? f.hi : f.en}</h3>
                <p className="text-sm text-gray-500">{lang === 'hi' ? f.desc_hi : f.desc_en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              {lang === 'hi' ? 'असली नतीजे' : 'Real Results'}
            </h2>
            <p className="text-gray-500">{lang === 'hi' ? 'हजारों लोग पहले से बदल रहे हैं अपनी जिंदगी' : 'Thousands already transforming their lives'}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className={s <= t.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                  "{lang === 'hi' ? t.quote_hi : t.quote_en}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${t.color} rounded-xl flex items-center justify-center font-bold text-white text-sm`}>{t.init}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">📍 {t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            {lang === 'hi' ? 'अभी शुरू करें — मुफ्त!' : 'Start Today — It\'s Free!'}
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            {lang === 'hi' ? '10,000+ भारतीय पहले से स्किल सीखकर कमाई कर रहे हैं' : 'Join 10,000+ Indians learning skills and earning real money'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-white text-green-700 font-black text-lg rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              🚀 {lang === 'hi' ? 'मुफ्त खाता बनाएं' : 'Create Free Account'}
            </Link>
            <Link to="/login" className="px-8 py-4 bg-white/20 border-2 border-white/40 hover:bg-white/30 text-white font-bold text-lg rounded-2xl transition-all">
              {lang === 'hi' ? 'लॉगिन करें' : 'Login'}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 text-sm mb-8">
          <div>
            <p className="font-black text-white text-lg mb-2">SkillGrow India</p>
            <p className="leading-relaxed">Empowering rural India with skills and sustainable income.</p>
          </div>
          <div>
            <p className="font-bold text-white mb-3">Platform</p>
            <ul className="space-y-1.5">
              <li><Link to="/login" className="hover:text-white transition">{lang === 'hi' ? 'लॉगिन' : 'Login'}</Link></li>
              <li><Link to="/register" className="hover:text-white transition">{lang === 'hi' ? 'रजिस्टर' : 'Register'}</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-white mb-3">{lang === 'hi' ? 'संपर्क' : 'Contact'}</p>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2"><Phone size={14} /> 1800-XXX-XXXX (Free)</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> Rural India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs">
          © 2025 SkillGrow India. Made with ❤️ for Rural India.
        </div>
      </footer>
    </div>
  );
}
