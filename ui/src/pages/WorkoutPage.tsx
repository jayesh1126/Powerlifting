import React, { useEffect, useState } from 'react';
import { PageHeader } from '../layouts/PageHeader';
import { DefaultSidebar } from '../components/DefaultSidebar';
import { Set } from '../models/set';
import { SetsList } from '../components/SetsList';
import * as SetsApi from "../network/sets_api";
import AddSetForm from '../components/AddSetForm';

function WorkoutPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sets, setSets] = useState<Set[]>([]);
    const [showAddSetForm, setShowSetForm] = useState(false);

    useEffect(() => {
        async function loadSets() {
            try {
                const sets = await SetsApi.fetchSets();
                setSets(sets);
            } catch (error) {
                console.error(error);
                alert(error);
            }
            
        }
        loadSets();
    }, []);
  

    async function deleteSet(set: Set) {
      try {
        await SetsApi.deleteSet(set._id);
        setSets(sets.filter(existingSet => existingSet._id !== set._id));
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

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
            <button 
            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowSetForm(true)}>
              Add New Set
            </button>
            <SetsList sets={sets} onDeleteSetClicked={deleteSet} />
            </div>
            { showAddSetForm &&
              <AddSetForm
              onClose={() => setShowSetForm(false)}
              onSetSaved={(newSet) => {
                setSets([...sets, newSet]);
                setShowSetForm(false);
              }} />
            }
          </div>
        </div>
      </div>
    );
  }

  export default WorkoutPage;