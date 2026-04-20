import { X } from 'lucide-react';

const HELP_CONTENT = {
  login: { en: 'Enter your 10-digit mobile number and password to login.', hi: 'लॉगिन के लिए 10 अंकों का मोबाइल और पासवर्ड दर्ज करें।' },
  default: { en: 'Use the navigation to explore all features.', hi: 'सभी फीचर एक्सप्लोर करने के लिए नेविगेशन का उपयोग करें।' },
};

export default function HelpModal({ pageId = 'default', isOpen, onClose }) {
  if (!isOpen) return null;
  const content = HELP_CONTENT[pageId] || HELP_CONTENT.default;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Help</h3>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <p className="text-sm text-gray-600">{content.en}</p>
        <p className="text-sm text-gray-500 mt-2">{content.hi}</p>
      </div>
    </div>
  );
}
