// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage'; // Adjust the import path as needed
import LoginPage from './pages/LoginPage'; // Create this component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
