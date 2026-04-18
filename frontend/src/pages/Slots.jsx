import { useState } from 'react';
import { CalendarDays, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { TRAINING_SLOTS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { slotsAPI } from '../services/api';

const STATUS_STYLES = {
  Open: 'bg-green-100 text-green-700',
  Full: 'bg-red-100 text-red-700',
  'Starting Soon': 'bg-yellow-100 text-yellow-700',
};

export default function Slots() {
  const { user } = useAuth();
  const [enrolled, setEnrolled] = useState([]);

  const handleJoin = async (slot) => {
    if (!user) return;
    try {
      await slotsAPI.enrollSlot({ user_id: user.id, slot_name: slot.skill, trainer_name: slot.trainer, fee_paid: slot.fee });
      setEnrolled(prev => [...prev, slot.id]);
    } catch { setEnrolled(prev => [...prev, slot.id]); }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-6 sticky top-0 z-20">
        <h1 className="text-lg font-bold text-gray-900">Join a Training Session</h1>
        <p className="text-xs text-gray-500">ट्रेनिंग सेशन में शामिल हों</p>
      </div>

      <div className="px-4 py-5 lg:px-6 space-y-4">
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-start gap-3">
          <AlertCircle size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-800 font-medium">Training starts when 10 users join. (10 उपयोगकर्ता जुड़ने पर शुरू होगा।)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TRAINING_SLOTS.map(slot => {
            const progress = (slot.joined / slot.max) * 100;
            const isFull = slot.status === 'Full';
            const isEnrolled = enrolled.includes(slot.id);

            return (
              <div key={slot.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{slot.skill}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">by {slot.trainer}</p>
                  </div>
                  <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_STYLES[slot.status]}`}>
                    {slot.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-gray-500">Duration</p>
                    <p className="font-bold text-gray-900 mt-0.5">{slot.duration}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-gray-500">Start Date</p>
                    <p className="font-bold text-gray-900 mt-0.5">{slot.startDate}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg px-3 py-2">
                    <p className="text-green-600">Fee</p>
                    <p className="font-bold text-green-700 mt-0.5">₹{slot.fee}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-1 text-gray-500"><Users size={11} /> Slots</div>
                    <p className="font-bold text-gray-900 mt-0.5">{slot.joined}/{slot.max}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Seats filled</span>
                    <span className="text-xs font-semibold text-gray-700">{slot.joined}/{slot.max}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${progress >= 100 ? 'bg-red-500' : progress >= 80 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {isEnrolled ? (
                  <button disabled className="w-full py-3 bg-green-50 text-green-700 font-bold rounded-xl text-sm flex items-center justify-center gap-2">
                    <CheckCircle size={15} /> Joined!
                  </button>
                ) : (
                  <button onClick={() => handleJoin(slot)} disabled={isFull} className={`w-full py-3 font-bold rounded-xl text-sm transition-colors ${isFull ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white shadow-sm'}`}>
                    {isFull ? 'Slot Full' : `Join Slot — ₹${slot.fee}`}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
