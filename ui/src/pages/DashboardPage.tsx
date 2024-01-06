import React, { useState } from 'react';
import { PageHeader } from '../layouts/PageHeader';
import { CategoryPills } from '../components/CategoryPills';
import { categories, profile } from '../data/home';
import { DashboardView } from '../components/DashboardView';
import { DefaultSidebar } from '../components/DefaultSidebar';

function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      {/* Pass toggleSidebar to the PageHeader */}
      <PageHeader toggleSidebar={toggleSidebar} />
      <div className='flex flex-1 min-h-0'>
        {/* Control the rendering of the sidebar based on isSidebarOpen */}
        {isSidebarOpen && (
          <div className='flex-shrink-0 w-64 lg:w-72 xl:w-80'>
            <DefaultSidebar />
          </div>
        )}
        <div className='flex-grow overflow-auto'>
          <div className='flex justify-center p-4'>
          <CategoryPills categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
          </div>
          <div className="p-8">
            <DashboardView key={profile[0].profileID} {...profile[0]} />
            {/* Other dashboard items */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
