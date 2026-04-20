# SkillGrow India 🌱

**Empowering rural India with skills, training, and real income opportunities.**

---

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
# Create .env (already provided)
npm run dev
# Server runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# App opens on http://localhost:5173
```

---

## 🔑 Key Fixes Applied

### Critical Bug Fixes
1. **User.js regex** — Fixed `\\d` → `\d` (was breaking ALL registration)
2. **MongoDB URI** — Added database name `skillgrow` to URI
3. **Skill routes** — Fixed `/my-skills` ordering (must be before `/:id`)
4. **AuthContext** — Cleaned up logout, error propagation
5. **App routing** — Home page now loads first (not login)

### Features Added/Fixed
- ✅ Home page loads first at `/`
- ✅ Login/Signup buttons prominent on landing
- ✅ After login → redirects to `/dashboard`
- ✅ Profile dropdown: View Profile / Settings / Logout
- ✅ Language switcher (EN/Hindi) on all pages — no mixed text
- ✅ Photo + Video upload on Add Skill page
- ✅ Redesigned Profile page with modern card layout
- ✅ Fixed sidebar/navbar alignment
- ✅ Mobile responsive bottom nav
- ✅ Clean TopBar with notifications
- ✅ All pages translated (EN/Hindi toggle)
- ✅ Dark mode removed (was broken) — clean light theme instead

---

## 📁 Project Structure

```
skillgrow-jsx/
├── frontend/          # React + Vite + Tailwind
│   └── src/
│       ├── pages/     # All 16 pages
│       ├── components/
│       │   └── layout/ # Layout, TopBar, Sidebar, MobileNav
│       ├── context/   # AuthContext, AppContext
│       └── services/  # api.js
└── backend/           # Node.js + Express + MongoDB
    ├── controllers/
    ├── models/
    ├── routes/
    └── middleware/
```

---

## 🎯 Demo Flow (for judges)

1. Open http://localhost:5173 → **Landing page**
2. Click **"Get Started Free"** → Register with mobile number
3. After registration → **Dashboard** with stats, quick actions
4. Click **"Add Skill"** → Add a skill with photo/video upload
5. Click **"Learn Skill"** → Browse 200+ skills, request learning
6. Click **"Find Trainer"** → See available trainers, call/chat
7. Click **"Jobs"** → Browse jobs, apply, post hiring
8. Click **"Profile"** → See redesigned profile, language switch
9. Top navbar → Profile dropdown → Logout

---

## 🌐 Language Switch

Click the **EN/हिं** button in:
- Top navbar (when logged in)
- Landing page navbar
- Login/Register pages

All content switches between English and Hindi instantly.

---

## 🛠️ .env (Backend)

```
PORT=5000
MONGODB_URI=mongodb+srv://...@cluster0.../skillgrow?appName=Cluster0
JWT_SECRET=skillgrow_secret_key_2025
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

## 🛠️ .env (Frontend)

```
VITE_API_URL=http://localhost:5000/api
```
