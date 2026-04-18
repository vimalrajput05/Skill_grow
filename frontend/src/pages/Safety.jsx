import { ShieldCheck, CheckCircle } from 'lucide-react';
import { SAFETY_TIPS } from '../data/mockData';

export default function Safety() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-6 sticky top-0 z-20">
        <h1 className="text-lg font-bold text-gray-900">Stay Safe Online</h1>
        <p className="text-xs text-gray-500">ऑनलाइन सुरक्षित रहें</p>
      </div>

      <div className="px-4 py-5 lg:px-6 space-y-5">
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-5 text-white">
          <ShieldCheck size={32} className="mb-2" />
          <h2 className="font-black text-lg">Your Digital Safety Matters</h2>
          <p className="text-sm opacity-90 mt-1">आपकी डिजिटल सुरक्षा जरूरी है — Learn these tips to protect yourself and your family online.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SAFETY_TIPS.map(tip => (
            <div key={tip.id} className={`rounded-2xl border p-5 ${tip.color}`}>
              <div className="flex items-start gap-3 mb-3">
                <ShieldCheck size={22} className={tip.iconColor} />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{tip.title}</h3>
                  <p className="text-xs text-gray-500">{tip.titleHi}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {tip.tips.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={13} className={`${tip.iconColor} mt-0.5 flex-shrink-0`} />
                    <span className="text-xs text-gray-700 leading-snug">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Report Fraud (धोखाधड़ी रिपोर्ट करें)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Cyber Crime Portal', sub: 'cybercrime.gov.in', color: 'bg-blue-50 text-blue-700' },
              { label: 'Helpline', sub: '1930 (Free call)', color: 'bg-green-50 text-green-700' },
              { label: 'WhatsApp Tip Line', sub: '+91-9643-000-888', color: 'bg-teal-50 text-teal-700' },
            ].map((item, i) => (
              <div key={i} className={`${item.color} rounded-xl px-4 py-3 text-center`}>
                <p className="text-xs font-bold">{item.label}</p>
                <p className="text-xs opacity-80 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
