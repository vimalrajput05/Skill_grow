import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';

export const useVoice = () => {
  const { lang, voiceEnabled } = useAppContext();

  const speak = useCallback((text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Language settings
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to get preferred voice
    const voices = window.speechSynthesis.getVoices();
    if (lang === 'hi') {
      const hindiVoice = voices.find(voice => voice.lang.startsWith('hi'));
      if (hindiVoice) utterance.voice = hindiVoice;
    } else {
      const englishVoice = voices.find(voice => voice.lang.startsWith('en-US') || voice.lang.startsWith('en-GB'));
      if (englishVoice) utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [lang, voiceEnabled]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  return { speak, stop };
};

