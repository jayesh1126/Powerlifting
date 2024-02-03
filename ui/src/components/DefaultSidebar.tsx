import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Typography, List, ListItem } from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  // Replace with the actual icon import for workouts
} from "@heroicons/react/24/solid";
import { User } from '../models/user';
import * as SetsApi from "../network/sets_api";


interface DefaultSidebarProps {
  // To remove null
  loggedInUser: User,
  onLogoutSuccessful: () => void,
}

export const DefaultSidebar = ({loggedInUser, onLogoutSuccessful} : DefaultSidebarProps) => {
  const navigate = useNavigate();


  async function logout() {
    try {
        await SetsApi.logout();
        onLogoutSuccessful();
        navigate('/');
    } catch (error) {
        console.error(error);
        alert(error);
    }
  }

  const handleWorkout = () => {
    navigate('/workouts');
  }

  const handleDashboard = () => {
    navigate('/dashboard');
  }

  return (
    <Card className="w-64 lg:w-72 xl:w-80 p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar {loggedInUser.username}
        </Typography>
      </div>
      <List>
        <ListItem onClick={handleDashboard}>
          <Link to="/" className="flex items-center">
            <PresentationChartBarIcon className="h-5 w-5" />
            Dashboard
          </Link>
        </ListItem>
        <ListItem onClick={handleWorkout}>
          {/* The workouts link is non-functional for now, so it's just a text item */}
          <div className="flex items-center">
            {/* Replace with actual icon */}
            <UserCircleIcon className="h-5 w-5" />
            Workouts
          </div>
        </ListItem>
        <ListItem>
          <Link to="/settings" className="flex items-center">
            <Cog6ToothIcon className="h-5 w-5" />
            Settings
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/profile" className="flex items-center">
            <UserCircleIcon className="h-5 w-5" />
            Profile
          </Link>
        </ListItem>
        <ListItem onClick={logout} className="cursor-pointer flex items-center">
          <PowerIcon className="h-5 w-5" />
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default DefaultSidebar;
