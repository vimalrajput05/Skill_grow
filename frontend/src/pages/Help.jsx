import { Link } from 'react-router-dom';
import { HelpCircle, Phone, ArrowLeft } from 'lucide-react';

const FAQS = [
  { q: 'How do I register?', a: 'Click "Get Started Free" on the home page and fill in your details.' },
  { q: 'How do I add a skill?', a: 'After login, go to "Add Skill" from the dashboard or sidebar.' },
  { q: 'How does training work?', a: 'Join a training slot. When 10 people join, training starts automatically.' },
  { q: 'How do I get paid?', a: 'Your earnings appear in the Payment section and can be withdrawn via UPI.' },
];

export default function Help() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 max-w-2xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-green-600 font-semibold mb-6 hover:underline">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <HelpCircle size={20} className="text-green-600" />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900">Help Center</h1>
          <p className="text-sm text-gray-500">मदद केंद्र</p>
        </div>
      </div>
      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="font-bold text-gray-900 text-sm mb-2">Q: {faq.q}</p>
            <p className="text-sm text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3">
        <Phone size={18} className="text-green-600" />
        <div>
          <p className="text-sm font-bold text-green-800">Still need help?</p>
          <p className="text-xs text-green-600">Call 1800-XXX-XXXX (Free, 9AM–6PM)</p>
        </div>
      </div>
    </div>
  );
}
