import { useState } from 'react';
import { Search, Star, Phone, MessageCircle, Video, MapPin } from 'lucide-react';
import { TRAINERS } from '../data/mockData';

export default function Trainers() {
  const [search, setSearch] = useState('');

  const filtered = TRAINERS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const stars = (rating) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={13} className={i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
    ));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-6 sticky top-0 z-20">
        <h1 className="text-lg font-bold text-gray-900">Find a Trainer</h1>
        <p className="text-xs text-gray-500">ट्रेनर खोजें</p>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or skill..." className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
      </div>

      <div className="px-4 py-5 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(trainer => (
            <div key={trainer.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 ${trainer.avatarColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">{trainer.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm">{trainer.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{trainer.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={11} className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-500 truncate">{trainer.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {stars(trainer.rating)}
                  <span className="text-xs font-bold text-gray-700 ml-1">{trainer.rating}</span>
                </div>
                <span className="text-xs text-gray-500">{trainer.trained} trained</span>
              </div>

              <span className={`self-start px-3 py-1 rounded-full text-xs font-semibold ${trainer.availColor}`}>
                {trainer.availability}
              </span>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <button className="flex flex-col items-center gap-1 py-2 bg-green-50 hover:bg-green-100 rounded-xl transition">
                  <Phone size={16} className="text-green-600" />
                  <span className="text-xs font-semibold text-green-700">Call</span>
                </button>
                <button className="flex flex-col items-center gap-1 py-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition">
                  <MessageCircle size={16} className="text-blue-600" />
                  <span className="text-xs font-semibold text-blue-700">Chat</span>
                </button>
                <button className="flex flex-col items-center gap-1 py-2 bg-orange-50 hover:bg-orange-100 rounded-xl transition">
                  <Video size={16} className="text-orange-600" />
                  <span className="text-xs font-semibold text-orange-700">Video</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">No trainers found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
