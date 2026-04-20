export default function VoiceButton({ text, size = 'sm' }) {
  const speak = () => {
    if ('speechSynthesis' in window && text) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hi-IN';
      window.speechSynthesis.speak(u);
    }
  };
  return null; // non-intrusive; keep for future
}
