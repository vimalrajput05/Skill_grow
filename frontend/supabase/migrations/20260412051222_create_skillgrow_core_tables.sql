/*
  # SkillGrow India — Core Tables

  1. New Tables
    - `user_profiles`
      - `id` (uuid, references auth.users)
      - `full_name` (text)
      - `mobile` (text, unique)
      - `village` (text)
      - `state` (text)
      - `avatar_url` (text, optional)
      - `trust_score` (integer, default 0)
      - `earnings_this_month` (numeric, default 0)
      - `created_at` (timestamptz)

    - `user_skills`
      - `id` (uuid)
      - `user_id` (uuid, references user_profiles)
      - `skill_name` (text)
      - `category` (text)
      - `description` (text)
      - `photo_url` (text, optional)
      - `video_url` (text, optional)
      - `status` (text: pending/verified)
      - `created_at` (timestamptz)

    - `learn_requests`
      - `id` (uuid)
      - `user_id` (uuid, references user_profiles)
      - `skill_name` (text)
      - `category` (text)
      - `created_at` (timestamptz)

    - `job_postings`
      - `id` (uuid)
      - `posted_by` (uuid, references user_profiles, optional)
      - `type` (text: seeker/hiring)
      - `name` (text)
      - `skill` (text)
      - `location` (text)
      - `experience_or_pay` (text)
      - `contact` (text)
      - `created_at` (timestamptz)

    - `slot_enrollments`
      - `id` (uuid)
      - `user_id` (uuid, references user_profiles)
      - `slot_name` (text)
      - `trainer_name` (text)
      - `fee_paid` (numeric)
      - `status` (text: active/completed)
      - `created_at` (timestamptz)

  2. Security
    - RLS enabled on all tables
    - Users can read/write their own data
    - Job postings are publicly readable
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  mobile text UNIQUE NOT NULL DEFAULT '',
  village text NOT NULL DEFAULT '',
  state text NOT NULL DEFAULT '',
  avatar_url text DEFAULT '',
  trust_score integer DEFAULT 0,
  earnings_this_month numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  skill_name text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Other',
  description text DEFAULT '',
  photo_url text DEFAULT '',
  video_url text DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS learn_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  skill_name text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_name)
);

CREATE TABLE IF NOT EXISTS job_postings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  posted_by uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  type text NOT NULL DEFAULT 'seeker',
  name text NOT NULL DEFAULT '',
  skill text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  experience_or_pay text DEFAULT '',
  contact text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS slot_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  slot_name text NOT NULL DEFAULT '',
  trainer_name text DEFAULT '',
  fee_paid numeric DEFAULT 0,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE learn_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE slot_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own skills"
  ON user_skills FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skills"
  ON user_skills FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own skills"
  ON user_skills FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own learn requests"
  ON learn_requests FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own learn requests"
  ON learn_requests FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own learn requests"
  ON learn_requests FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone authenticated can view job postings"
  ON job_postings FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert job postings"
  ON job_postings FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can delete own job postings"
  ON job_postings FOR DELETE TO authenticated
  USING (auth.uid() = posted_by);

CREATE POLICY "Users can view own enrollments"
  ON slot_enrollments FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enrollments"
  ON slot_enrollments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
