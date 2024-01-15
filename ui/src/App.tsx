// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage'; 
import WorkoutPage from './pages/WorkoutPage'; 

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/workouts" element={<WorkoutPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
