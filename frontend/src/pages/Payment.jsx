import { useState } from 'react';
import { CheckCircle, Star, CreditCard, Smartphone, Building2, Info } from 'lucide-react';

const PLANS = [
  {
    id: 'basic', name: 'Basic Plan', price: 200, badge: null,
    features: ['1 Skill Course', '7-day Session', 'WhatsApp Support', 'Certificate of Completion', 'Session Recording'],
    color: 'border-gray-200', headerBg: 'bg-gray-50', badgeBg: '',
  },
  {
    id: 'pro', name: 'Pro Plan', price: 500, badge: 'Most Popular',
    features: ['Up to 5 Skills', '30-day Session', 'Priority Support', 'Certificate + Badge', 'Live Trainer Access', 'Job Placement Help', 'Community Access'],
    color: 'border-green-400', headerBg: 'bg-green-600', badgeBg: 'bg-yellow-400 text-yellow-900',
  },
];

const PAYMENT_METHODS = [
  { id: 'upi', icon: Smartphone, label: 'UPI', sub: 'GPay, PhonePe, Paytm' },
  { id: 'netbanking', icon: Building2, label: 'Net Banking', sub: 'All major banks' },
  { id: 'card', icon: CreditCard, label: 'Card', sub: 'Debit / Credit card' },
];

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [selectedMethod, setSelectedMethod] = useState('upi');

  const plan = PLANS.find(p => p.id === selectedPlan);

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-6 sticky top-0 z-20">
        <h1 className="text-lg font-bold text-gray-900">Choose Your Plan</h1>
        <p className="text-xs text-gray-500">अपना प्लान चुनें</p>
      </div>

      <div className="px-4 py-5 lg:px-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          {PLANS.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPlan(p.id)}
              className={`rounded-2xl border-2 overflow-hidden text-left transition-all ${selectedPlan === p.id ? p.color + ' shadow-md' : 'border-gray-100'}`}
            >
              <div className={`px-4 py-3 ${p.id === 'pro' ? 'bg-green-600' : 'bg-gray-50'}`}>
                {p.badge && (
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-1 ${p.badgeBg}`}>{p.badge}</span>
                )}
                <p className={`font-bold text-sm ${p.id === 'pro' ? 'text-white' : 'text-gray-900'}`}>{p.name}</p>
                <p className={`text-xl font-black mt-0.5 ${p.id === 'pro' ? 'text-white' : 'text-gray-900'}`}>₹{p.price}</p>
              </div>
              <div className="px-4 py-3 space-y-1.5 bg-white">
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-green-600 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
              {selectedPlan === p.id && (
                <div className={`px-4 py-2 text-center text-xs font-bold ${p.id === 'pro' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  ✓ Selected
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Payment Method (भुगतान विधि)</h2>
          <div className="space-y-2">
            {PAYMENT_METHODS.map(({ id, icon: Icon, label, sub }) => (
              <button
                key={id}
                onClick={() => setSelectedMethod(id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 transition-all ${selectedMethod === id ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selectedMethod === id ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <Icon size={18} className={selectedMethod === id ? 'text-green-600' : 'text-gray-500'} />
                </div>
                <div className="text-left flex-1">
                  <p className={`text-sm font-bold ${selectedMethod === id ? 'text-green-700' : 'text-gray-900'}`}>{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedMethod === id ? 'border-green-600' : 'border-gray-300'}`}>
                  {selectedMethod === id && <div className="w-2 h-2 bg-green-600 rounded-full" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-start gap-3">
          <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-800">Money is refunded if session does not start within 7 days. (7 दिनों में शुरू न होने पर राशि वापस।)</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-gray-600">{plan?.name}</span>
            <span className="font-bold">₹{plan?.price}</span>
          </div>
          <div className="flex justify-between items-center text-sm mb-3">
            <span className="text-gray-600">Platform fee</span>
            <span className="font-bold text-green-600">FREE</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-xl font-black text-green-600">₹{plan?.price}</span>
          </div>
        </div>

        <button className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl text-base transition-colors shadow-lg flex items-center justify-center gap-2">
          <Star size={18} /> Pay Now — ₹{plan?.price}
        </button>
      </div>
    </div>
  );
}
