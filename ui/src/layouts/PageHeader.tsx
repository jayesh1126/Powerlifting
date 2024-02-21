import React from 'react';
import { Menu } from "lucide-react";
import logo from "../assets/logo.svg";

type PageHeaderProps = {
  toggleSidebar: () => void;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ toggleSidebar }) => {
    return (
        <div className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 focus:outline-none mr-4">
                        <Menu className="h-6 w-6" />
                    </button>
                    <a href="/" className="hidden md:block">
                        <img src={logo} alt="Logo" className="h-8" />
                    </a>
                </div>

                {/* Centered title with flex-grow to ensure it centers */}
                <h1 className="flex-grow text-xl text-center text-gray-800 font-semibold">
                    Powerlifting Performance Analytics Dashboard
                </h1>

                {/* Invisible spacer element to balance the flex layout */}
                <div className="flex items-center opacity-0">
                    <Menu className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
};
