// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage'; 
import WorkoutPage from './pages/WorkoutPage'; 
import { useEffect, useState } from 'react';
import { User } from './models/user';
import * as SetsApi from "./network/sets_api";

function App() {
  
  const [loggedInUser, setLoggedinUser] = useState<User|null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await SetsApi.getLoggedInUser();
        setLoggedinUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading to false after the fetch operation
      }
    }
    fetchLoggedInUser();
  }, []);

  // If we're still loading, just return a loading indicator
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={loggedInUser ? <DashboardPage loggedInUser={loggedInUser}
        onLogoutSuccessful={() => setLoggedinUser(null)} /> :
         <LoginPage onLoginSuccessful={setLoggedinUser} />} />
        <Route path="/dashboard" element={loggedInUser ? <DashboardPage loggedInUser={loggedInUser}
        onLogoutSuccessful={() => setLoggedinUser(null)}/>:
         <LoginPage onLoginSuccessful={setLoggedinUser} />} />
        <Route path="/workouts" element={loggedInUser ?<WorkoutPage loggedInUser={loggedInUser}
        onLogoutSuccessful={() => setLoggedinUser(null)}/>:
         <LoginPage onLoginSuccessful={setLoggedinUser} />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
