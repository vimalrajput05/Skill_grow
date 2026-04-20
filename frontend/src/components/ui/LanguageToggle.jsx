import { useAppContext } from '../../context/AppContext';

export default function LanguageToggle() {
  const { lang, toggleLang } = useAppContext();
  return (
    <button onClick={toggleLang} className="flex bg-gray-100 rounded-lg p-0.5 text-xs font-bold">
      <span className={`px-2.5 py-1.5 rounded-md transition ${lang === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>EN</span>
      <span className={`px-2.5 py-1.5 rounded-md transition ${lang === 'hi' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>हिं</span>
    </button>
  );
}
