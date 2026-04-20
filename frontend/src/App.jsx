import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddSkill from './pages/AddSkill';
import LearnSkill from './pages/LearnSkill';
import Trainers from './pages/Trainers';
import Slots from './pages/Slots';
import Payment from './pages/Payment';
import AIAwareness from './pages/AIAwareness';
import Jobs from './pages/Jobs';
import MicroIndustry from './pages/MicroIndustry';
import Safety from './pages/Safety';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import Help from './pages/Help';

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 font-medium">Loading SkillGrow...</p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/help" element={<Help />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/add-skill" element={<ProtectedRoute><Layout><AddSkill /></Layout></ProtectedRoute>} />
      <Route path="/learn" element={<ProtectedRoute><Layout><LearnSkill /></Layout></ProtectedRoute>} />
      <Route path="/trainers" element={<ProtectedRoute><Layout><Trainers /></Layout></ProtectedRoute>} />
      <Route path="/slots" element={<ProtectedRoute><Layout><Slots /></Layout></ProtectedRoute>} />
      <Route path="/payment" element={<ProtectedRoute><Layout><Payment /></Layout></ProtectedRoute>} />
      <Route path="/ai-awareness" element={<ProtectedRoute><Layout><AIAwareness /></Layout></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><Layout><Jobs /></Layout></ProtectedRoute>} />
      <Route path="/micro-industry" element={<ProtectedRoute><Layout><MicroIndustry /></Layout></ProtectedRoute>} />
      <Route path="/safety" element={<ProtectedRoute><Layout><Safety /></Layout></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute><Layout><Progress /></Layout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </AppProvider>
  );
}
