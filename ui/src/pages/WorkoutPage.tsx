import React, { useEffect, useState } from 'react';
import { PageHeader } from '../layouts/PageHeader';
import { profile } from '../data/home';
import { DashboardView } from '../components/DashboardView';
import { DefaultSidebar } from '../components/DefaultSidebar';
import { Set } from '../models/set';

function WorkoutPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sets, setSets] = useState<Set[]>([]);

    useEffect(() => {
        async function loadSets() {
            try {
                const response = await fetch("/api/sets", {method: "GET"});
                const sets = await response.json();
                setSets(sets);
            } catch (error) {
                console.error(error);
                alert(error);
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
            <div className="p-8">
              {JSON.stringify(sets)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default WorkoutPage;