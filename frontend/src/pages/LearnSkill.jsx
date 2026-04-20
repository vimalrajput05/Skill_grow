import { useState } from 'react';
import { Search, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LEARN_SKILLS } from '../data/mockData';

export default function LearnSkill() {
  const { lang } = useAppContext();
  const [search, setSearch] = useState('');
  const [requested, setRequested] = useState(new Set());

  const filtered = LEARN_SKILLS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div>
        <h1 className="text-xl font-black text-gray-900">{lang === 'hi' ? 'स्किल सीखें' : 'Learn a Skill'}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{lang === 'hi' ? '200+ स्किल उपलब्ध हैं' : '200+ skills available'}</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder={lang === 'hi' ? 'स्किल खोजें...' : 'Search skills...'}
          className="input-field pl-10" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map(skill => (
          <div key={skill.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-gray-900">{skill.name}</h3>
                  {skill.requested > 30 && (
                    <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <TrendingUp size={10} /> {lang === 'hi' ? 'अधिक मांग' : 'High Demand'}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span className={`px-2 py-0.5 rounded-full font-medium ${skill.color}`}>{skill.category}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {skill.duration}</span>
                </div>
                <p className="text-sm font-bold text-green-600 mt-2">{lang === 'hi' ? 'अनुमानित कमाई:' : 'Estimated earn:'} {skill.earning}</p>
                <p className="text-xs text-gray-400 mt-0.5">{skill.requested} {lang === 'hi' ? 'लोगों ने मांगा' : 'people requested'}</p>
              </div>
            </div>
            <button
              onClick={() => setRequested(prev => new Set([...prev, skill.id]))}
              disabled={requested.has(skill.id)}
              className={`w-full mt-3 py-2.5 rounded-xl text-sm font-bold transition active:scale-95 ${
                requested.has(skill.id)
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md'
              }`}>
              {requested.has(skill.id)
                ? (lang === 'hi' ? '✓ अनुरोध भेजा गया!' : '✓ Request Sent!')
                : (lang === 'hi' ? 'मुझे सीखना है' : 'I Want to Learn')}
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">{lang === 'hi' ? 'कोई स्किल नहीं मिली' : 'No skills found'}</p>
        </div>
      )}
    </div>
  );
}
