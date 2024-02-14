import React, { useEffect, useState } from 'react';
import { PageHeader } from '../layouts/PageHeader';
import { CategoryPills } from '../components/CategoryPills';
import { categories } from '../data/home';
import { DashboardView } from '../components/DashboardView';
import { DefaultSidebar } from '../components/DefaultSidebar';
import * as SetsApi from "../network/sets_api";
import { Set } from '../models/set';
import { useUser } from '../components/UserContext';

interface DashboardPageProps {
  onLogoutSuccessful: () => void,
}

export const DashboardPage = ({ onLogoutSuccessful} : DashboardPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [sets, setSets] = useState<Set[]>([]);
  const [setsLoading, setSetsLoading] = useState(true);
  const [showSetLoadingError, SetShowSetLoadingError] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    async function loadSets() {
        try {
            SetShowSetLoadingError(false);
            setSetsLoading(true);
            const sets = await SetsApi.fetchSets();
            setSets(sets);
        } catch (error) {
            console.error(error);
            SetShowSetLoadingError(true);
        } finally {
          setSetsLoading(false)
        }
        
    }
    loadSets();
}, []);



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
          {showSetLoadingError && <p>Something went wrong, please refresh the page.</p>}
          {!setsLoading && !showSetLoadingError &&
          <div className="p-8">
            <DashboardView sets={sets} />
            {/* Other dashboard items */}
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
