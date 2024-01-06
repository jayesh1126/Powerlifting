import React from 'react';
import { Bell, Menu, Upload, User } from "lucide-react";
import logo from "../assets/logo.svg";
import { Button } from "../components/Button";

// Add a prop for the toggle function
type PageHeaderProps = {
  toggleSidebar: () => void; // Function to toggle the sidebar
};

export const PageHeader: React.FC<PageHeaderProps> = ({ toggleSidebar }) => {
    return (
        <div className="flex justify-between items-center p-4">
            <div className="flex gap-4 items-center flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <Menu />
                </Button>
                <a href="/">
                    <img src={logo} alt="Logo" className="h-6" />
                </a>
            </div>
            <div> Powerlifting Performance Analytics Dashboard </div>
            <div className="flex flex-shrink-0 md:gap-2">
                <Button size="icon" variant="ghost">
                    <Upload />
                </Button>
                <Button size="icon" variant="ghost">
                    <Bell />
                </Button>
                <Button size="icon" variant="ghost">
                    <User />
                </Button>
            </div>
        </div>
    );
};
