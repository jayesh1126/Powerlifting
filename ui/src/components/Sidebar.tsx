import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Typography, List, ListItem } from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import * as UsersApi from "../network/users_api";
import { useUser } from './UserContext';

export const DefaultSidebar = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  async function logout() {
    try {
        await UsersApi.logout();
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
    <Card className="w-64 lg:w-72 xl:w-80 p-4 shadow-xl h-screen">
      <div className="mb-4 p-4 rounded-lg ">
        <Typography variant="h5" className="font-bold">
          Navigation
        </Typography>
      </div>
      <List className="divide-y divide-white">
        <ListItem onClick={handleDashboard} className="hover: transition-colors duration-150 ease-in-out">
          <Link to="/" className="flex items-center ">
            <PresentationChartBarIcon className="h-5 w-5 mr-2 " />
            Dashboard
          </Link>
        </ListItem>
        <ListItem onClick={handleWorkout} className="hover: transition-colors duration-150 ease-in-out">
          <div className="flex items-center ">
            <UserCircleIcon className="h-5 w-5 mr-2 " />
            Workouts
          </div>
        </ListItem>
        <ListItem onClick={handleProfile} className="hover: transition-colors duration-150 ease-in-out">
          <Link to="/profile" className="flex items-center ">
            <UserCircleIcon className="h-5 w-5 mr-2 " />
            Profile
          </Link>
        </ListItem>
        <ListItem onClick={logout} className="cursor-pointer flex items-center  hover: transition-colors duration-150 ease-in-out">
          <PowerIcon className="h-5 w-5 mr-2 text-red-500" />
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default DefaultSidebar;
