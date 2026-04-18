import { X, Volume2, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import VoiceButton from './VoiceButton';
import { useAppContext } from '../../context/AppContext';

const HELP_CONTENT = {
  dashboard: {
    en: [
      'Step 1: View your Trust Score and earnings',
      'Step 2: Use Quick Actions cards to navigate',
      'Step 3: Check Recent Activity for updates'
    ],
    hi: [
      'चरण 1: अपना विश्वास स्कोर और कमाई देखें',
      'चरण 2: त्वरित कार्य कार्ड्स का उपयोग करें',
      'चरण 3: हाल की गतिविधि जांचें'
    ]
  },
  // Add more page help here
  default: {
    en: ['Click "?" for help on any page.'],
    hi: ['किसी भी पेज पर "?" दबाएं मदद के लिए।']
  }
};

const HelpModal = ({ pageId = 'default', isOpen, onClose }) => {
  const [showHi, setShowHi] = useState(false);
  const { lang, t } = useAppContext();
  const content = HELP_CONTENT[pageId] || HELP_CONTENT.default;
  const steps = lang === 'hi' ? content.hi : content.en;

  if (!isOpen) return null;

  const helpText = steps.join(' ');

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end lg:items-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl dark:text-white">{t('helpTitle')}</h2>
                <p className="text-sm text-gray-500">{t('howToUse')} - {pageId}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <VoiceButton text={helpText} size="sm" />
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-l-4 border-blue-500">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-900 dark:text-white leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('voiceOn')} to listen • {lang === 'en' ? 'EN' : 'हिं'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;

