import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Navbar } from './components/Navbar';
import { ProfilePage } from './components/ProfilePage';
import { EventPage } from './components/EventPage';
import { CreateEventForm } from './components/CreateEventForm';
import { ChatbotMatching } from './components/ChatbotMatching';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ExplorePage } from './components/ExplorePage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/create-event" element={<CreateEventForm />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/chatbot" element={<ChatbotMatching />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;