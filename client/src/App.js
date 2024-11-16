// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { ExplorePage } from './components/ExplorePage';
import { CreateEventForm } from './components/CreateEventForm';
import { EventPage } from './components/EventPage';
import { ChatbotMatching } from './components/ChatbotMatching';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { CorporateProfile } from './components/CorporateProfile';
import { ProfilePage } from './components/ProfilePage';
import { useAuth } from './contexts/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Layout Component with Navbar
const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
            {/* Redirect to appropriate dashboard based on user type */}
            {user?.type === 'corporate' ? <ExplorePage /> :
             user?.type === 'nonprofit' ? <ProfilePage /> :
             <ExplorePage />}
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/explore" element={
        <ProtectedRoute>
          <DashboardLayout>
            <ExplorePage />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/create-event" element={
        <ProtectedRoute>
          <DashboardLayout>
            <CreateEventForm />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/event/:id" element={
        <ProtectedRoute>
          <DashboardLayout>
            <EventPage />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/chatbot" element={
        <ProtectedRoute>
          <DashboardLayout>
            <ChatbotMatching />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/analytics" element={
        <ProtectedRoute>
          <DashboardLayout>
            <AnalyticsDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/corporate-profile" element={
        <ProtectedRoute>
          <DashboardLayout>
            <CorporateProfile />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/nonprofit-profile" element={
        <ProtectedRoute>
          <DashboardLayout>
            <ProfilePage />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <AppRoutes />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;