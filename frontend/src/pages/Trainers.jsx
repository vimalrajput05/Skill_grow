import { Phone, MessageCircle, Video, Star, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { TRAINERS } from '../data/mockData';

export default function Trainers() {
  const { lang } = useAppContext();
  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div>
        <h1 className="text-xl font-black text-gray-900">{lang === 'hi' ? 'ट्रेनर खोजें' : 'Find a Trainer'}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{lang === 'hi' ? 'प्रमाणित ट्रेनर से जुड़ें' : 'Connect with certified trainers'}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {TRAINERS.map(t => (
          <div key={t.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
            <div className="flex items-start gap-3 mb-4">
              <div className={`w-12 h-12 ${t.avatarColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-black">{t.initials}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{t.name}</h3>
                <p className="text-xs text-gray-500">{t.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={11} className="text-gray-400" />
                  <span className="text-xs text-gray-400">{t.location}</span>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${t.availColor}`}>{t.availability}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} size={13} className={s <= t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />)}
                <span className="text-xs text-gray-600 ml-1 font-semibold">{t.rating}</span>
              </div>
              <span className="text-xs text-gray-500">{t.trained} {lang === 'hi' ? 'ट्रेन किए' : 'trained'}</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl text-xs font-bold transition">
                <Phone size={13} /> {lang === 'hi' ? 'कॉल' : 'Call'}
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition">
                <MessageCircle size={13} /> {lang === 'hi' ? 'चैट' : 'Chat'}
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs font-bold transition">
                <Video size={13} /> {lang === 'hi' ? 'वीडियो' : 'Video'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
