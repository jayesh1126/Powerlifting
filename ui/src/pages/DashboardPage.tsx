import React, { useEffect, useState } from 'react';
import { PageHeader } from '../layouts/PageHeader';
import { DashboardView } from '../components/DashboardView';
import { DefaultSidebar } from '../components/Sidebar';
import * as SetsApi from "../network/sets_api";
import { Set } from '../models/set';



export const DashboardPage = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sets, setSets] = useState<Set[]>([]);
  const [setsLoading, setSetsLoading] = useState(true);
  const [showSetLoadingError, setShowSetLoadingError] = useState(false);


  useEffect(() => {
    async function loadSets() {
        try {
            setShowSetLoadingError(false);
            setSetsLoading(true);
            const sets = await SetsApi.fetchSets();
            setSets(sets);
        } catch (error) {
            console.error(error);
            setShowSetLoadingError(true);
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
      <PageHeader toggleSidebar={toggleSidebar} />
      <div className='flex flex-1 min-h-0'>
        {isSidebarOpen && (
          <div className='flex-shrink-0 w-64 lg:w-72 xl:w-80'>
            <DefaultSidebar />
          </div>
        )}
        <div className='flex-grow overflow-auto'>

          {showSetLoadingError && <p>Something went wrong, please refresh the page.</p>}
          {setsLoading && <div>Loading...</div>}
          {!setsLoading && !showSetLoadingError &&
          <div className="p-8">
            <DashboardView sets={sets} />
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
