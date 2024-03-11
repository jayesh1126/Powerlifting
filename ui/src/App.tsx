import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage'; 
import WorkoutPage from './pages/WorkoutPage'; 
import ProfilePage from './pages/ProfilePage'; 
import { useEffect, useState } from 'react';
import { User } from './models/user';
import * as UsersApi from "./network/users_api";
import { UserProvider } from './components/UserContext';

function App() {
  
  const [loggedInUser, setLoggedInUser] = useState<User|undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UsersApi.getLoggedInUser();
        setLoggedInUser(user);
        // console.log(user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
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
    <UserProvider user={loggedInUser} setUser={setLoggedInUser}>
      <Router>
        <Routes>
          <Route path="/" element={loggedInUser ? <DashboardPage /> :
          <LoginPage/>} />
          <Route path="/dashboard" element={loggedInUser ? <DashboardPage/>:
          <LoginPage/>} />
          <Route path="/workouts" element={loggedInUser ?<WorkoutPage/>:
          <LoginPage/>} />
          <Route path="/profile" element={loggedInUser ?<ProfilePage/>:
          <LoginPage/>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
