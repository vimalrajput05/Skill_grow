import { useState } from 'react';
import { Factory, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MICRO_GROUPS, PENDING_ORDERS } from '../data/mockData';

export default function MicroIndustry() {
  const { lang } = useAppContext();
  const [joined, setJoined] = useState(new Set());
  const [applied, setApplied] = useState(new Set());

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div>
        <h1 className="text-xl font-black text-gray-900">{lang === 'hi' ? 'माइक्रो उद्योग' : 'Micro Industry'}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{lang === 'hi' ? 'ग्रुप बनाएं, ऑर्डर लें, कमाई करें' : 'Form groups, get orders, earn together'}</p>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
        <p className="text-sm text-orange-700 font-semibold">
          💡 {lang === 'hi' ? 'ग्रुप में काम करने से ₹50K+ मासिक कमाई संभव है!' : 'Group work can earn ₹50K+ monthly income!'}
        </p>
      </div>

      {/* Groups */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-3">{lang === 'hi' ? '👥 ग्रुप जॉइन करें' : '👥 Join a Group'}</h2>
        <div className="space-y-3">
          {MICRO_GROUPS.map(g => (
            <div key={g.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{g.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{g.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">📍 {g.area} · {g.members} {lang === 'hi' ? 'सदस्य' : 'members'}</p>
                    <p className="text-xs text-gray-500 mt-0.5">💡 {g.suggestion}</p>
                    <p className="text-sm font-bold text-green-600 mt-1">₹{g.incomeMin.toLocaleString()} – ₹{g.incomeMax.toLocaleString()}/{lang === 'hi' ? 'माह' : 'month'}</p>
                  </div>
                </div>
                <button onClick={() => setJoined(prev => new Set([...prev, g.id]))} disabled={joined.has(g.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition active:scale-95 ${
                    joined.has(g.id) ? 'bg-green-100 text-green-700' : 'bg-green-600 hover:bg-green-700 text-white shadow-sm'
                  }`}>
                  {joined.has(g.id) ? (lang === 'hi' ? '✓ जुड़े' : '✓ Joined') : (lang === 'hi' ? 'जुड़ें' : 'Join')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orders */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-3">{lang === 'hi' ? '📦 पेंडिंग ऑर्डर' : '📦 Pending Orders'}</h2>
        <div className="space-y-3">
          {PENDING_ORDERS.map(o => (
            <div key={o.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{o.product}</h3>
                  <p className="text-xs text-gray-500 mt-1">📦 {o.quantity} · 🏙️ {o.buyer}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs font-bold text-green-600">💰 {lang === 'hi' ? 'एडवांस:' : 'Advance:'} {o.advance}</span>
                    <span className="text-xs text-gray-500">📅 {o.deadline}</span>
                  </div>
                </div>
                <button onClick={() => setApplied(prev => new Set([...prev, o.id]))} disabled={applied.has(o.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition active:scale-95 ${
                    applied.has(o.id) ? 'bg-blue-100 text-blue-700' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                  }`}>
                  {applied.has(o.id) ? (lang === 'hi' ? '✓ आवेदन किया' : '✓ Applied') : (lang === 'hi' ? 'आवेदन करें' : 'Apply')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
