// src/App.js
import React from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import ForumPage from './components/ForumPage';
import './styles/style.css'; // Import your CSS file

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="logo">Group 2</div>
              <div className="nav-links">
                  <a href="#home" className="active">Home</a>
                  <a href="/forum" id="forum-link">Forum</a>
                  <a>Local Matching</a>
                  <a>Plan Food Tour</a>
                  <a>Pricing</a>
              </div>
              <div className="auth-links">
                  <a>Sign Up</a>
                  <a>Log In</a>
          </div>
        </nav>

        {/* Routes for Home and Forum */}
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/forum" element={<ForumPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
