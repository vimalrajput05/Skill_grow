import { ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SAFETY_TIPS } from '../data/mockData';

export default function Safety() {
  const { lang } = useAppContext();
  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl font-black text-gray-900">{lang === 'hi' ? 'डिजिटल सुरक्षा' : 'Digital Safety'}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{lang === 'hi' ? 'ऑनलाइन सुरक्षित रहें' : 'Stay safe online'}</p>
      </div>
      <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-red-700 font-medium">
          {lang === 'hi'
            ? '⚠️ कभी भी किसी अनजान व्यक्ति को OTP, पासवर्ड या बैंक जानकारी न दें!'
            : '⚠️ Never share OTP, passwords, or bank details with strangers!'}
        </p>
      </div>
      <div className="space-y-4">
        {SAFETY_TIPS.map(tip => (
          <div key={tip.id} className={`rounded-2xl border p-5 ${tip.color}`}>
            <h3 className={`font-bold text-base mb-3 flex items-center gap-2 ${tip.iconColor}`}>
              <ShieldCheck size={18} /> {lang === 'hi' ? tip.titleHi : tip.title}
            </h3>
            <ul className="space-y-2">
              {tip.tips.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span> {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
