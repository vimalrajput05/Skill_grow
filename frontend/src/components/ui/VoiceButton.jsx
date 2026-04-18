import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { useVoice } from '../../hooks/useVoice';
import { useAppContext } from '../../context/AppContext';

const VoiceButton = ({ text = '', size = 'md', className = '', position = 'fixed-bottom-right' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { speak, stop } = useVoice();
  const { voiceEnabled, t } = useAppContext();

  const handleVoiceToggle = () => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else if (voiceEnabled) {
      speak(text || document.title);
      setIsSpeaking(true);
      
      // Auto stop listener
      const onEnd = () => {
        setIsSpeaking(false);
        window.speechSynthesis.removeEventListener('end', onEnd);
      };
      window.speechSynthesis.addEventListener('end', onEnd);
    }
  };

  const iconSize = size === 'sm' ? 'w-8 h-8' : 'w-12 h-12';

  return (
    <button
      onClick={handleVoiceToggle}
      className={`
        ${position === 'fixed-bottom-right' ? 'fixed bottom-6 right-6 z-50' : 'inline-flex'}
        ${iconSize} p-3 rounded-full shadow-2xl border-2 border-white/50
        bg-gradient-to-br from-white/90 to-white/50 dark:from-gray-900/90 dark:to-gray-800/90
        backdrop-blur-lg hover:scale-110 transition-all duration-300
        ${voiceEnabled ? 'hover:shadow-green-500/25 shadow-green-400/20' : 'opacity-50 cursor-not-allowed'}
        ${className}
      `}
      title={isSpeaking ? t('voiceOff') : t('voiceOn')}
      aria-label={isSpeaking ? t('voiceOff') : t('voiceOn')}
    >
      {isSpeaking ? (
        <VolumeX className="w-full h-full text-red-500 animate-pulse" />
      ) : (
        <Volume2 className="w-full h-full text-green-600 dark:text-green-400" />
      )}
    </button>
  );
};

export default VoiceButton;

