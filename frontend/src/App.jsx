import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import TypingTest from './components/TypingTest';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Profile from './components/Profile'
import SettingsPage from './components/SettingsPage'
import AboutPage from './components/AboutPage';
import ProfileSettings from './components/ProfileSettings'

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow overflow-auto">
          <Routes>
            <Route path="/" element={<TypingTest />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<Auth />}/>
            <Route path="/profile-settings" element={<ProfileSettings />} />
            <Route path="/dashboard" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
