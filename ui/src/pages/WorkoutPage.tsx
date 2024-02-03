import React, { useEffect, useState } from 'react';
import { PageHeader } from '../layouts/PageHeader';
import { DefaultSidebar } from '../components/DefaultSidebar';
import { Set } from '../models/set';
import { SetsList } from '../components/SetsList';
import * as SetsApi from "../network/sets_api";
import AddEditSetForm from '../components/AddEditSetForm';
import { User } from '../models/user';

interface WorkoutPageProps {
  // To remove null
  loggedInUser: User,
  onLogoutSuccessful: () => void,
}

export const WorkoutPage = ({loggedInUser, onLogoutSuccessful} : WorkoutPageProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sets, setSets] = useState<Set[]>([]);
    const [showAddSetForm, setShowSetForm] = useState(false);
    const [setToEdit, setSetToEdit] = useState<Set|null>(null);
    const [setsLoading, setSetsLoading] = useState(true);
    const [showSetLoadingError, SetShowSetLoadingError] = useState(false);

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
              <DefaultSidebar 
            // To put user in there later
            loggedInUser={loggedInUser}
            onLogoutSuccessful={onLogoutSuccessful}/>
            </div>
          )}
          <div className='flex-grow overflow-auto'>
            <div className="p-8">
            <button 
            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowSetForm(true)}>
              Add New Set
            </button>
            {showSetLoadingError && <p>Something went wrong, please refresh the page.</p>}
            {!setsLoading && !showSetLoadingError &&
            <>
            { sets.length > 0
                ? <SetsList sets={sets} onDeleteSetClicked={deleteSet} 
                onSetClicked={setSetToEdit} />
                : <p>You don't have any sets yet.</p>
            }
            </>
            }
            
            </div>
            { showAddSetForm &&
              <AddEditSetForm
              onClose={() => setShowSetForm(false)}
              onSetSaved={(newSet) => {
                setSets([...sets, newSet]);
                setShowSetForm(false);
              }} />
            }
            {setToEdit &&
            <AddEditSetForm
            setToEdit={setToEdit}
            onClose={() => setSetToEdit(null)}
            onSetSaved={(updatedSet) =>{
              setSets(sets.map(existingSet => existingSet._id === updatedSet._id 
                ? updatedSet : existingSet))
                setSetToEdit(null);
            }}
            />
          }
          </div>
        </div>
      </div>
    );
  }

  export default WorkoutPage;