import { Search, ChevronRight, Volume2, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import VoiceButton from '../components/ui/VoiceButton';
import HelpModal from '../components/ui/HelpModal';
import LanguageToggle from '../components/ui/LanguageToggle';
import { useAppContext } from '../context/AppContext';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPage, setSelectedPage] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { t, lang } = useAppContext();

  const helpPages = [
    { id: 'dashboard', title: 'Dashboard', enTitle: 'Home', hiTitle: 'होम' },
    { id: 'add-skill', title: 'Add Skill', enTitle: 'Add Skill', hiTitle: 'स्किल जोड़ें' },
    { id: 'learn', title: 'Learn Skills', enTitle: 'Learn Skill', hiTitle: 'स्किल सीखें' },
    { id: 'trainers', title: 'Trainers', enTitle: 'Find Trainer', hiTitle: 'ट्रेनर खोजें' },
    { id: 'slots', title: 'Training Slots', enTitle: 'Training Slots', hiTitle: 'ट्रेनिंग स्लॉट' },
    { id: 'jobs', title: 'Jobs', enTitle: 'Jobs', hiTitle: 'नौकरी' },
    { id: 'profile', title: 'Profile', enTitle: 'Profile', hiTitle: 'प्रोफाइल' },
    { id: 'safety', title: 'Safety', enTitle: 'Safety', hiTitle: 'सुरक्षा' },
  ];

  const filteredPages = helpPages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.enTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page[`${lang}Title`].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openHelp = (pageId) => {
    setSelectedPage(pageId);
    setShowHelpModal(true);
  };

  const helpInstructions = filteredPages.map(page => (
    <button
      key={page.id}
      onClick={() => openHelp(page.id)}
      className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 group-hover:scale-105 transition-all">
          <HelpCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg dark:text-white">{page[`${lang}Title`]}</h3>
          <p className="text-sm text-gray-500 group-hover:text-green-600 dark:group-hover:text-green-400">
            Step-by-step guide • {page[`${lang === 'en' ? 'hi' : 'en'}Title`]}
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
    </button>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl">
              <HelpCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Help & Guide
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">सहायता और मार्गदर्शिका</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <VoiceButton text={`${t('helpTitle')} help page`} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={lang === 'en' ? 'Search help topics...' : 'सहायता विषय खोजें...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-5 border-2 border-gray-200 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-900 text-lg focus:ring-4 focus:ring-green-500 focus:border-transparent shadow-lg transition-all duration-300"
            />
          </div>
        </div>

        {/* Help Pages Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {helpInstructions}
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all">
              <h3 className="font-bold text-xl mb-3 dark:text-white">How do training slots work?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                When 10+ users request a skill, auto training slot opens. Join when ready (max 20 users).
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all">
              <h3 className="font-bold text-xl mb-3 dark:text-white">What is Trust Score?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                +5 joining slot, +15 completing, +25 group order. Score 85+ = premium orders.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all">
              <h3 className="font-bold text-xl mb-3 dark:text-white">Voice & Language?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Speaker icon reads pages aloud. Language toggle EN↔हिं. Works offline!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      <HelpModal 
        pageId={selectedPage || 'help'} 
        isOpen={showHelpModal} 
        onClose={() => setShowHelpModal(false)} 
      />

      {/* Global Voice Button */}
      <VoiceButton />
    </div>
  );
};

export default Help;

