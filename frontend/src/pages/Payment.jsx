import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function Payment() {
  const { lang } = useAppContext();
  const { user } = useAuth();

  const txns = [
    { id: 1, desc_en: 'Training slot - Carpentry', desc_hi: 'ट्रेनिंग स्लॉट - बढ़ईगीरी', amount: -200, date: '10 Jan', status: 'paid' },
    { id: 2, desc_en: 'Skill referral bonus', desc_hi: 'स्किल रेफरल बोनस', amount: +350, date: '08 Jan', status: 'received' },
    { id: 3, desc_en: 'WhatsApp Business slot', desc_hi: 'व्हाट्सएप बिज़नेस स्लॉट', amount: -200, date: '01 Jan', status: 'paid' },
    { id: 4, desc_en: 'Order completion reward', desc_hi: 'ऑर्डर पूर्ण पुरस्कार', amount: +1500, date: '28 Dec', status: 'received' },
  ];

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl font-black text-gray-900">{lang === 'hi' ? 'भुगतान' : 'Payment'}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{lang === 'hi' ? 'आपका वॉलेट और लेन-देन' : 'Your wallet and transactions'}</p>
      </div>

      {/* Wallet */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-80 mb-1">{lang === 'hi' ? 'कुल कमाई इस महीने' : 'Total Earnings This Month'}</p>
        <p className="text-4xl font-black">₹2,350</p>
        <div className="flex items-center gap-4 mt-4">
          <button className="flex-1 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-bold transition">
            {lang === 'hi' ? 'निकालें' : 'Withdraw'}
          </button>
          <button className="flex-1 py-2.5 bg-white text-green-700 hover:bg-green-50 rounded-xl text-sm font-bold transition">
            {lang === 'hi' ? 'भेजें' : 'Send'}
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-3">{lang === 'hi' ? '💳 भुगतान विधियां' : '💳 Payment Methods'}</h2>
        <div className="space-y-2">
          {['UPI (PhonePe / GPay)', 'Bank Transfer', 'Paytm'].map((m, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <CreditCard size={16} className="text-green-600" />
              <span className="text-sm font-medium text-gray-700">{m}</span>
              <CheckCircle size={15} className="text-green-500 ml-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-900 mb-3">{lang === 'hi' ? '📋 लेन-देन इतिहास' : '📋 Transaction History'}</h2>
        <div className="space-y-2">
          {txns.map(t => (
            <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm font-semibold text-gray-900">{lang === 'hi' ? t.desc_hi : t.desc_en}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.date}</p>
              </div>
              <span className={`text-sm font-black ${t.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
