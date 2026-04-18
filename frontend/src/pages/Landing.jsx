import { Link } from 'react-router-dom';
import { Phone, Users, Award, Clock, MapPin, TrendingUp, GraduationCap, DollarSign, Shield, Sparkles, Users2, Factory } from 'lucide-react';
import LanguageToggle from '../components/ui/LanguageToggle';
import VoiceButton from '../components/ui/VoiceButton';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';

const Landing = () => {
  const { t } = useAppContext();

  useEffect(() => {
    document.title = 'SkillGrow India - Learn Skills, Earn Money';
  }, []);

  const stats = [
    { number: '100+', label: 'Skills' },
    { number: '50+', label: 'Trainers' },
    { number: '10K+', label: 'Users' },
    { number: '₹8K', label: 'Avg Income' },
  ];

  const steps = [
    { number: '1', title: 'Learn', desc: 'Master new skills with certified trainers' },
    { number: '2', title: 'Train', desc: 'Join live sessions and group learning' },
    { number: '3', title: 'Earn', desc: 'Get jobs, orders, and micro-business opportunities' },
  ];

  const features = [
    { icon: GraduationCap, title: 'Learn Skills', desc: '200+ practical skills in 8 categories' },
    { icon: Users2, title: 'Live Training', desc: 'Group training starts automatically at 10 users' },
    { icon: Sparkles, title: 'AI Ready', desc: 'AI tools that boost farm income 40%' },
    { icon: TrendingUp, title: 'Jobs', desc: 'Local + remote work matching your skills' },
    { icon: Factory, title: 'Micro Business', desc: 'Form groups, take verified orders' },
    { icon: Shield, title: 'Safety First', desc: 'Fraud protection + digital safety training' },
  ];

  const testimonials = [
    {
      name: 'Ramesh Kumar',
      location: 'Bihar',
      quote: 'Learned digital marketing, now earning ₹12k/month from village itself!',
      stars: 5
    },
    {
      name: 'Priya Devi',
      location: 'UP',
      quote: 'AI crop prediction tool increased my yield by 35%. Life changing!',
      stars: 5
    },
    {
      name: 'Sunil Yadav',
      location: 'Rajasthan',
      quote: 'Formed group, took first order ₹25k. Trust score now 92!',
      stars: 5
    },
  ];

  const heroText = `${t('heroTitle')} ${t('heroSub')}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              SkillGrow
            </Link>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <Link
                to="/login"
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                {t('loginBtn')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              {t('heroSub')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <Link
                to="/register"
                className="w-full sm:w-auto btn-primary text-lg py-4 px-8 shadow-2xl"
              >
                {t('getStarted')}
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg rounded-2xl font-semibold text-gray-900 dark:text-white hover:shadow-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300"
              >
                {t('loginBtn')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </section>

      {/* Stats */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-emerald-600/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/90 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              3 simple steps to transform your skills into real income
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 items-center max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="group relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-green-400 to-blue-500 hidden md:block" />
                )}
                
                <div className="text-center p-8 group-hover:scale-105 transition-all duration-500">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-green-500/25 group-hover:rotate-6 transition-all duration-500">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From learning to earning, complete skill growth platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 card-hover">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-green-500/25 group-hover:scale-110 transition-all duration-300 mx-auto">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-center">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Micro Industry Spotlight */}
      <section className="py-24 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
              Micro Industry Revolution
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Form groups, take verified orders, scale to ₹50K+ monthly income
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Group Orders</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">₹25K pickle making order - 5 members, 1 month</p>
              <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-2xl">
                <p className="font-semibold text-orange-800 dark:text-orange-300">Trust Score 85+</p>
              </div>
            </div>
            <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Production Units</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">₹40K spice grinding - 8 members, 45 days</p>
              <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-2xl">
                <p className="font-semibold text-orange-800 dark:text-orange-300">Verified Skill Required</p>
              </div>
            </div>
            <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Bulk Orders</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">₹75K garment stitching - 12 members, 2 months</p>
              <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-2xl">
                <p className="font-semibold text-orange-800 dark:text-orange-300">Advance Payment System</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-6">
              Real Results
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Thousands already transforming lives through skills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-500">
                <div className="flex gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-5 h-5 rounded-full ${i < testimonial.stars ? 'bg-yellow-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-lg">
                    RK
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Start?
          </h2>
          <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 10,000+ Indians learning skills and earning real money from their villages
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/register"
              className="w-full sm:w-auto btn-primary text-xl py-6 px-12 shadow-2xl text-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-12 py-6 bg-white/20 backdrop-blur border-2 border-white/30 rounded-2xl font-bold text-white hover:bg-white/30 hover:shadow-2xl transition-all duration-300 text-lg"
            >
              Have Account? Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12 text-sm">
          <div>
            <h4 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-6">
              SkillGrow India
            </h4>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering rural India with modern skills and sustainable income opportunities
            </p>
            <div className="flex gap-4">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                EN | हिं
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                Dark Mode
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold">
                Voice AI
              </span>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold text-white mb-6">Platform</h5>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold text-white mb-6">Contact</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="tel:+91" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                Helpline 1800-SKILL-GROW
              </a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                <MapPin className="w-4 h-4" />
                Rural India
              </a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800/50 mt-16 pt-12 text-center text-gray-500 text-xs">
          <p>&copy; 2025 SkillGrow India. Made with ❤️ for rural India.</p>
        </div>
      </footer>

      {/* Global Voice Button */}
      <VoiceButton text={heroText} />
    </div>
  );
};

export default Landing;

