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

export const DefaultSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/');
  };

  return (
    <Card className="w-64 lg:w-72 xl:w-80 p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem>
          <Link to="/" className="flex items-center">
            <PresentationChartBarIcon className="h-5 w-5" />
            Dashboard
          </Link>
        </ListItem>
        <ListItem>
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
        <ListItem onClick={handleLogout} className="cursor-pointer flex items-center">
          <PowerIcon className="h-5 w-5" />
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default DefaultSidebar;
