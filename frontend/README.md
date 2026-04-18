# SkillGrow India 🌱

A rural skill development platform connecting India's villages with learning, training, and income opportunities.

## Tech Stack
- React 18 (JSX)
- Tailwind CSS
- React Router v7
- Supabase (Auth + Database)
- Axios
- Vite

# Getting Started 🚀

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Copy & setup .env**
   ```bash
   cp .env.example .env.local
   # Open .env.local, fill VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from supabase.com dashboard
   ```

3. **Supabase Setup** (one-time):
   - Create project at supabase.com
   - Run migration: `cd "../New folder/supabase" && supabase db push` (or create 'user_profiles' table manually with columns: id uuid, full_name text, mobile text, village text, state text, etc.)

4. **Run dev server**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173

**Common Issues:**
- Blank screen? Check .env.local vars loaded (restart server).
- Auth error? Verify Supabase keys + enable email auth.
- Profile missing? Table 'user_profiles' needed (code auto-creates on signup).

## Pages
- `/login` — Login with mobile number
- `/register` — Create account
- `/` — Dashboard
- `/add-skill` — Add your skill
- `/learn` — Learn new skills
- `/trainers` — Find trainers
- `/slots` — Join training slots
- `/payment` — Plans & payment
- `/ai-awareness` — AI education
- `/jobs` — Job board
- `/micro-industry` — Group business
- `/safety` — Digital safety
- `/progress` — My journey
- `/profile` — Profile & settings

## Connecting Your Backend
Edit `src/services/api.js` and set:
```
VITE_API_URL=https://your-backend.com/api
```
All API endpoints are already defined and ready to connect.
