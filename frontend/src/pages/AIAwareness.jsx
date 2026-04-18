import { Volume2, ChevronRight } from 'lucide-react';
import { AI_TOPICS } from '../data/mockData';

const TOPIC_COLORS = [
  'from-blue-50 to-blue-100 border-blue-200',
  'from-green-50 to-green-100 border-green-200',
  'from-orange-50 to-orange-100 border-orange-200',
  'from-pink-50 to-pink-100 border-pink-200',
  'from-red-50 to-red-100 border-red-200',
  'from-yellow-50 to-yellow-100 border-yellow-200',
];

export default function AIAwareness() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-6 sticky top-0 z-20">
        <h1 className="text-lg font-bold text-gray-900">AI Awareness</h1>
        <p className="text-xs text-gray-500">AI जागरूकता — Understand AI in simple language</p>
      </div>

      <div className="px-4 py-5 lg:px-6 space-y-5">
        <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-5 text-white">
          <div className="text-3xl mb-2">🤖</div>
          <h2 className="font-black text-lg">What is Artificial Intelligence?</h2>
          <p className="text-sm opacity-90 mt-1">AI means teaching computers to think, learn, and solve problems — just like humans do. It's already being used in farming, business, and education across India.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AI_TOPICS.map((topic, i) => (
            <div key={topic.id} className={`bg-gradient-to-br ${TOPIC_COLORS[i % TOPIC_COLORS.length]} border rounded-2xl p-5 flex flex-col gap-3`}>
              <div className="flex items-start justify-between">
                <span className="text-3xl">{topic.icon}</span>
                <button className="w-8 h-8 bg-white/60 hover:bg-white rounded-lg flex items-center justify-center transition">
                  <Volume2 size={15} className="text-gray-600" />
                </button>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{topic.title}</h3>
                <p className="text-xs text-gray-600 font-medium">{topic.titleHi}</p>
                <p className="text-xs text-gray-700 mt-2 leading-relaxed">{topic.desc}</p>
              </div>
              <button className="flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-gray-900 transition mt-auto">
                Learn More <ChevronRight size={13} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-3">AI in Rural India (ग्रामीण भारत में AI)</h2>
          <div className="space-y-3">
            {[
              { stat: '40%', desc: 'Crop yield increase with AI-guided farming', icon: '🌾' },
              { stat: '2x', desc: 'Income growth for digital skill workers', icon: '💰' },
              { stat: '5M+', desc: 'Rural youth trained in AI tools by 2026 (target)', icon: '👨‍💻' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-lg font-black text-green-600">{item.stat}</p>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
