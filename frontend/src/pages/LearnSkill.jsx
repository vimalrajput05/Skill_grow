import { useState } from 'react';
import { Search, Users, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import { LEARN_SKILLS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
const CATEGORIES = ['All', 'Farming', 'Home-Based', 'Technical', 'Digital', 'AI', 'Business'];

export default function LearnSkill() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [joined, setJoined] = useState([]);

  const filtered = LEARN_SKILLS.filter(s => {
    const matchesCat = activeCategory === 'All' || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleLearn = async (skill) => {
    if (!user) return;
    setJoined(prev => [...prev, skill.id]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-6 sticky top-0 z-20">
        <h1 className="text-lg font-bold text-gray-900">Choose a Skill to Learn</h1>
        <p className="text-xs text-gray-500">सीखने के लिए स्किल चुनें</p>

        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search skills... (स्किल खोजें)" className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
      </div>

      <div className="px-4 lg:px-6 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeCategory === cat ? 'bg-green-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 lg:px-6">
        <p className="text-xs text-gray-500 mb-3">{filtered.length} skills available</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(skill => (
            <div key={skill.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-gray-900 text-sm leading-tight">{skill.name}</h3>
                <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${skill.color}`}>{skill.category}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2.5 py-1">
                  <Clock size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-600">{skill.duration}</span>
                </div>
                <div className="flex items-center gap-1 bg-green-50 rounded-lg px-2.5 py-1">
                  <TrendingUp size={12} className="text-green-600" />
                  <span className="text-xs font-semibold text-green-700">+{skill.earning}/mo</span>
                </div>
                <div className="flex items-center gap-1 bg-blue-50 rounded-lg px-2.5 py-1">
                  <Users size={12} className="text-blue-500" />
                  <span className="text-xs text-blue-700">{skill.requested} requested</span>
                </div>
              </div>

              {joined.includes(skill.id) ? (
                <button disabled className="w-full py-2.5 bg-green-50 text-green-700 font-bold rounded-xl text-sm flex items-center justify-center gap-2">
                  <CheckCircle size={15} /> Request Sent!
                </button>
              ) : (
                <button onClick={() => handleLearn(skill)} className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm active:scale-95">
                  I Want to Learn (सीखना है)
                </button>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">No skills found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
