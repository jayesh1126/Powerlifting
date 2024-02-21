import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Typography, List, ListItem } from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import * as SetsApi from "../network/sets_api";
import { useUser } from './UserContext';

export const DefaultSidebar = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  async function logout() {
    try {
        await SetsApi.logout();
        setUser(undefined);
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

  const handleProfile = () => {
    navigate('/profile');
  }

  return (
    <Card className="w-64 lg:w-72 xl:w-80 p-4 shadow-xl bg-white">
      <div className="mb-4 p-4 bg-blue-500 rounded-lg text-white">
        <Typography variant="h5" className="font-bold">
          Navigation
        </Typography>
      </div>
      <List className="divide-y divide-gray-200">
        <ListItem onClick={handleDashboard} className="hover:bg-blue-100 transition-colors duration-150 ease-in-out">
          <Link to="/" className="flex items-center text-gray-700">
            <PresentationChartBarIcon className="h-5 w-5 mr-2 text-blue-500" />
            Dashboard
          </Link>
        </ListItem>
        <ListItem onClick={handleWorkout} className="hover:bg-blue-100 transition-colors duration-150 ease-in-out">
          <div className="flex items-center text-gray-700">
            <UserCircleIcon className="h-5 w-5 mr-2 text-blue-500" />
            Workouts
          </div>
        </ListItem>
        <ListItem className="hover:bg-blue-100 transition-colors duration-150 ease-in-out">
          <Link to="/settings" className="flex items-center text-gray-700">
            <Cog6ToothIcon className="h-5 w-5 mr-2 text-blue-500" />
            Settings
          </Link>
        </ListItem>
        <ListItem onClick={handleProfile} className="hover:bg-blue-100 transition-colors duration-150 ease-in-out">
          <Link to="/profile" className="flex items-center text-gray-700">
            <UserCircleIcon className="h-5 w-5 mr-2 text-blue-500" />
            Profile
          </Link>
        </ListItem>
        <ListItem onClick={logout} className="cursor-pointer flex items-center text-gray-700 hover:bg-blue-100 transition-colors duration-150 ease-in-out">
          <PowerIcon className="h-5 w-5 mr-2 text-red-500" />
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default DefaultSidebar;
