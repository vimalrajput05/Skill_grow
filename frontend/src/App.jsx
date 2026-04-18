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

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
<Route path="/landing" element={<Landing />} />
<Route path="/help" element={<Help />} />
<Route path="/*" element={
  <ProtectedRoute>
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-skill" element={<AddSkill />} />
        <Route path="/learn" element={<LearnSkill />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ai-awareness" element={<AIAwareness />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/micro-industry" element={<MicroIndustry />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  </ProtectedRoute>
} />
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
