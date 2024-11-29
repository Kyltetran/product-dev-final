// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/forum" className="nav-link">Forum</Link>
          </div>
        </nav>

        {/* Routes for Home and Forum */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forum" element={<ForumPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
