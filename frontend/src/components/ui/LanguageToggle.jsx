import { Globe } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const LanguageToggle = ({ className = '' }) => {
  const { lang, toggleLang, t } = useAppContext();

  return (
    <button
      onClick={toggleLang}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all
        bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-white/50 dark:border-gray-700/50
        hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg hover:scale-[1.02]
        ${className}
      `}
      title={`Switch to ${lang === 'en' ? 'Hindi' : 'English'}`}
    >
      <Globe className="w-5 h-5" />
      <span>{lang === 'en' ? 'EN' : 'हिं'}</span>
    </button>
  );
};

export default LanguageToggle;

