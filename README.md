# SkillGrow India 🚀

Production-ready full-stack skill learning platform for rural India with AI, voice support (Hindi/EN), dark mode, and real income opportunities.

## 🏗️ Tech Stack

**Backend**: Node.js + Express + MongoDB + JWT + Multer
**Frontend**: React 18 (JSX) + Vite + Tailwind CSS + React Router
**Features**: Web Speech API (voice), dark mode, EN↔हिं, help modals

## 📋 Quick Setup (5 min)

### Prerequisites
```
Node.js 18+
MongoDB (local or MongoDB Atlas)
```

### 1. Clone & Install
```bash
git clone <repo>
cd skillgrow-india
```

### 2. Backend Setup
```bash
cd backend
npm install
# Copy .env template & update MONGODB_URI, JWT_SECRET
cp .env.example .env  # or edit .env manually
npm run dev
```
**Runs**: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
**Runs**: `http://localhost:5173`

### 4. Test Flow
1. Visit `localhost:5173`
2. Landing → **Register** (mobile/password/village/state)
3. **Login** → Dashboard
4. Add Skill → Learn Skills → Request → Slots auto-create
5. Find trainers/jobs → Profile (trust score updates)

## 🚀 Features Demo

| Feature | Status |
|---------|--------|
| JWT Auth (mobile only) | ✅ |
| 7 Models (User/Skill/Trainer/Slot/Job/Group/Order) | ✅ |
| Voice AI (EN/Hindi) every page/card | ✅ |
| Dark Mode toggle | ✅ |
| Help modals step-by-step | ✅ |
| Demand → Auto Training Slots | ✅ |
| Trust Score system | ✅ |
| Responsive (mobile-first) | ✅ |
| Upload proof images | ✅ |

## 🗄️ Project Structure
```
skillgrow-india/
├── backend/          # Express API + MongoDB
├── frontend/         # React + Vite + Tailwind
├── .gitignore       # Node modules, env, uploads
└── README.md
```

## 🔧 Environment Variables

**backend/.env**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillgrow
JWT_SECRET=your_super_secret_key_2025
FRONTEND_URL=http://localhost:5173
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```

## 📱 Working Flow

```
1. User Registers (mobile + village)
2. Add Skills (photo proof upload)
3. Skills get verified → Trust Score +5
4. Request Skills (demandCount++)
5. 10+ requests → Auto TrainingSlot created
6. Join slot (10 users → auto 'active')
7. Complete → Trust Score +15
8. Post Jobs / Form Groups / Take Orders
9. Group completes → Trust Score +25
10. High trust → Premium orders
```

## 🎯 Business Logic

- **Demand Trigger**: `skill.demandCount >= 10` → create TrainingSlot
- **Slot Activation**: `joinedUsers >= minUsers` → status='active'
- **Trust Score**: Join(+5) → Complete(+15) → Order(+25), max 100
- **Uploads**: Multer to /uploads (images/videos <10MB)
- **Validation**: express-validator all inputs

## 🧪 API Endpoints (Postman)
```
POST /api/auth/register  → mobile/password/village
POST /api/auth/login     → {mobile, password} → JWT token
GET /api/auth/me         → user profile (protected)
GET /api/skills          → ?category=AI&search=crop
POST /api/skills/request/:id
GET /api/slots/join/:id
```

## 🌐 Production Deploy

```
Backend: Render/Heroku (MongoDB Atlas)
Frontend: Vercel/Netlify
Env: Change FRONTEND_URL to production domain
```

## 📞 Support
- Helpline: 1800-SKILL-GROW (demo)
- Voice: Speaker icon reads Hindi/EN
- Help: ? button every page with step-by-step

## 🤝 Contributing
1. Fork repo
2. `git checkout -b feature/add-new-skill`
3. `npm install && npm test`
4. Commit → PR

**Made with ❤️ for Rural India | ग्रामीण भारत के लिए**

![SkillGrow](https://via.placeholder.com/1200x600/16a34a/ffffff?text=SkillGrow+India)

