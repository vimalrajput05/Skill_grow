import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const { user, logout } = useAuth();
  const { lang, toggleLang, t } = useAppContext();
  const [open, setOpen] = useState(false);
  const [notif, setNotif] = useState(true);
  const ref = useRef(null);
  const navigate = useNavigate();

  const name = user?.fullName || 'User';
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 h-14">
        {/* Logo - mobile only */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-black">SG</span>
          </div>
          <span className="font-bold text-gray-900 text-sm">SkillGrow</span>
        </div>

        <div className="hidden lg:block" />

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold text-gray-700 transition"
          >
            {lang === 'en' ? '🇮🇳 हिं' : '🇬🇧 EN'}
          </button>

          {/* Notification */}
          <button
            className="relative w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition"
            onClick={() => setNotif(false)}
          >
            <Bell size={17} className="text-gray-600" />
            {notif && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 hover:bg-gray-100 rounded-xl transition"
            >
              <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xs">{initials}</span>
              </div>
              <span className="hidden sm:block text-sm font-semibold text-gray-700 max-w-24 truncate">{name.split(' ')[0]}</span>
              <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                <div className="px-4 py-3 border-b border-gray-50">
                  <p className="font-bold text-gray-900 text-sm truncate">{name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">📱 {user?.mobile}</p>
                </div>
                <div className="py-1">
                  <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                    <User size={15} className="text-gray-400" /> View Profile
                  </Link>
                  <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                    <Settings size={15} className="text-gray-400" /> Settings
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={() => { setOpen(false); logout(); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut size={15} /> {t('signOut')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
