import { useState } from 'react';
import { Users, Clock, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { TRAINING_SLOTS } from '../data/mockData';

export default function Slots() {
  const { lang } = useAppContext();
  const [joined, setJoined] = useState(new Set());

  const statusColors = { Open: 'bg-green-100 text-green-700', Full: 'bg-red-100 text-red-700', 'Starting Soon': 'bg-yellow-100 text-yellow-700' };

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div>
        <h1 className="text-xl font-black text-gray-900">{lang === 'hi' ? 'ट्रेनिंग स्लॉट' : 'Training Slots'}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{lang === 'hi' ? '10 लोग जुड़ने पर ट्रेनिंग शुरू होगी' : 'Training starts when 10 users join'}</p>
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 font-medium">
        💡 {lang === 'hi' ? 'स्लॉट जॉइन करें। जब 10 लोग जुड़ेंगे, ट्रेनिंग ऑटोमेटिक शुरू होगी।' : 'Join a slot. When 10 people join, training starts automatically.'}
      </div>
      <div className="space-y-4">
        {TRAINING_SLOTS.map(slot => {
          const pct = (slot.joined / slot.max) * 100;
          const isFull = slot.joined >= slot.max;
          const isJoined = joined.has(slot.id);
          return (
            <div key={slot.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{slot.skill}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{lang === 'hi' ? 'ट्रेनर:' : 'Trainer:'} {slot.trainer}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock size={11} /> {slot.duration}</span>
                    <span>📅 {slot.startDate}</span>
                    <span className="font-bold text-green-600">₹{slot.fee}</span>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${statusColors[slot.status] || 'bg-gray-100 text-gray-600'}`}>
                  {slot.status}
                </span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                  <span className="flex items-center gap-1"><Users size={11} /> {slot.joined}/{slot.max} {lang === 'hi' ? 'जुड़े' : 'joined'}</span>
                  <span>{slot.max - slot.joined} {lang === 'hi' ? 'सीट बची' : 'seats left'}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${pct >= 90 ? 'bg-red-400' : pct >= 60 ? 'bg-yellow-400' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
              <button
                onClick={() => !isFull && setJoined(prev => new Set([...prev, slot.id]))}
                disabled={isFull || isJoined}
                className={`w-full py-2.5 rounded-xl text-sm font-bold transition active:scale-95 ${
                  isJoined ? 'bg-green-100 text-green-700' :
                  isFull ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                  'bg-green-600 hover:bg-green-700 text-white shadow-sm'
                }`}>
                {isJoined ? (lang === 'hi' ? '✓ जुड़ गए!' : '✓ Joined!') :
                 isFull ? (lang === 'hi' ? 'स्लॉट भरा' : 'Slot Full') :
                 (lang === 'hi' ? 'स्लॉट जॉइन करें' : 'Join Slot')}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
