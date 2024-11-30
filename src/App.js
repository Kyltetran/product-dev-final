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
                  <a href="#local-matching">Local Matching</a>
                  <a href="#plan-food-tour">Plan Food Tour</a>
                  <a href="#pricing">Pricing</a>
              </div>
              <div className="auth-links">
                  <a href="#sign-up">Sign Up</a>
                  <a href="#log-in">Log In</a>
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
