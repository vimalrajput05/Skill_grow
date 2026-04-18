import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Bell, Globe, LogOut, Star, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { profile, user, signOut } = useAuth();
  const navigate = useNavigate();
  const [lang, setLang] = useState('EN');
  const [notifications, setNotifications] = useState(true);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const name = profile?.full_name || user?.email?.replace('@skillgrow.in', '') || 'User';
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const location = profile ? `${profile.village}, ${profile.state}` : 'India';

  const skills = ['Carpentry', 'Digital Marketing', 'Organic Farming'];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-6 sticky top-0 z-20">
        <h1 className="text-lg font-bold text-gray-900">My Profile</h1>
        <p className="text-xs text-gray-500">मेरी प्रोफाइल</p>
      </div>

      <div className="px-4 py-5 lg:px-6 space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-xl">{initials}</span>
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-base">{name}</h2>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={13} className="text-green-600" />
                  <span className="text-xs text-gray-600">{location}</span>
                </div>
                {profile?.mobile && <p className="text-xs text-gray-500 mt-0.5">📱 {profile.mobile}</p>}
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                  ))}
                  <span className="text-xs text-gray-600 ml-1">4.6 rating</span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex-shrink-0">
              <Edit2 size={13} /> Edit
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-gray-50">
            {[
              { label: 'Skills', value: '3' },
              { label: 'Sessions', value: '5' },
              { label: 'Trust Score', value: `${profile?.trust_score || 72}` },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-xl font-black text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><Award size={15} className="text-green-600" /> My Skills (मेरी स्किल्स)</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-100">{skill}</span>
            ))}
            <span className="px-3 py-1.5 bg-gray-50 text-gray-500 rounded-full text-xs font-medium border border-dashed border-gray-200 cursor-pointer hover:border-green-300 hover:text-green-600 transition">+ Add Skill</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Settings (सेटिंग्स)</h2>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-3 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Globe size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Language</p>
                  <p className="text-xs text-gray-500">भाषा</p>
                </div>
              </div>
              <div className="flex bg-gray-100 rounded-xl p-0.5">
                {(['EN', 'HI']).map(l => (
                  <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${lang === l ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>{l}</button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Bell size={16} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Notifications</p>
                  <p className="text-xs text-gray-500">सूचनाएं</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifications ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full py-3.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 transition border border-red-100"
        >
          <LogOut size={16} /> Sign Out (साइन आउट)
        </button>
      </div>
    </div>
  );
}
