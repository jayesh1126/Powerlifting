import React, { useEffect, useState } from 'react';
import { PageHeader } from '../layouts/PageHeader';
import { DefaultSidebar } from '../components/DefaultSidebar';
import { Set } from '../models/set';
import { SetsList } from '../components/SetsList';
import * as SetsApi from "../network/sets_api";
import AddEditSetForm from '../components/AddEditSetForm';

interface WorkoutPageProps {
  onLogoutSuccessful: () => void,
}

export const WorkoutPage = ({ onLogoutSuccessful } : WorkoutPageProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sets, setSets] = useState<Set[]>([]);
    const [showAddSetForm, setShowSetForm] = useState(false);
    const [setToEdit, setSetToEdit] = useState<Set|null>(null);
    const [setToCopy, setSetToCopy] = useState<Set|null>(null);
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
  <PageHeader toggleSidebar={toggleSidebar} />
  <div className='flex flex-1 overflow-hidden'>
    {isSidebarOpen && (
      <div className='flex-shrink-0 w-64 lg:w-72 xl:w-80'>
        <DefaultSidebar />
      </div>
    )}
    <div className='flex-grow overflow-auto p-8'>
      <button 
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1"
        onClick={() => setShowSetForm(true)}>
        Add New Set
      </button>
      {showSetLoadingError && <div className="text-red-500">Something went wrong, please refresh the page.</div>}
      {!setsLoading && !showSetLoadingError && (
        sets.length > 0 ? <SetsList sets={sets} onDeleteSetClicked={deleteSet} onSetClickedEdit={setSetToEdit} onSetClickedCopy={setSetToCopy} />
        : <p className="text-gray-700">You don't have any sets yet.</p>
      )}
      {showAddSetForm && (
        <AddEditSetForm
          onClose={() => setShowSetForm(false)}
          onSetSaved={(newSet) => {
            setSets([...sets, newSet]);
            setShowSetForm(false);
          }} 
        />
      )}
      {setToEdit && (
        <AddEditSetForm
          setToEdit={setToEdit}
          onClose={() => setSetToEdit(null)}
          onSetSaved={(updatedSet) => {
            setSets(sets.map(existingSet => existingSet._id === updatedSet._id ? updatedSet : existingSet));
            setSetToEdit(null);
          }}
        />
      )}
      {setToCopy && (
        <AddEditSetForm
          setToCopy={setToCopy}
          onClose={() => setSetToCopy(null)}
          onSetSaved={(newSet) => {
            setSets([...sets, newSet]);
            setSetToCopy(null);
          }} 
        />
      )}
    </div>
  </div>
</div>

    );
  }

  export default WorkoutPage;