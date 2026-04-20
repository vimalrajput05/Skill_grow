import { Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { AI_TOPICS } from '../data/mockData';

export default function AIAwareness() {
  const { lang } = useAppContext();
  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl font-black text-gray-900">{lang === 'hi' ? 'AI जागरूकता' : 'AI Awareness'}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{lang === 'hi' ? 'AI के बारे में सीखें' : 'Learn about Artificial Intelligence'}</p>
      </div>
      <div className="bg-violet-50 border border-violet-100 rounded-xl p-4">
        <p className="text-sm text-violet-700 font-medium">
          🤖 {lang === 'hi' ? 'AI टूल्स से कमाई 40% तक बढ़ सकती है!' : 'AI tools can increase your income by up to 40%!'}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {AI_TOPICS.map(topic => (
          <div key={topic.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition hover:border-violet-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{topic.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{lang === 'hi' ? topic.titleHi : topic.title}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{topic.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
