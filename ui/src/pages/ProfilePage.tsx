import React, { useState } from 'react';
import { User } from '../models/user';
import { UserIcon } from "@heroicons/react/24/solid";
import DefaultSidebar from '../components/DefaultSidebar';
import { PageHeader } from '../layouts/PageHeader';
import EditUserForm from '../components/EditUserForm';
import { useUser } from '../components/UserContext';

interface ProfilePageProps {
    // To remove null
    loggedInUser: User,
    onLogoutSuccessful: () => void,
  }

  export const ProfilePage = ({loggedInUser, onLogoutSuccessful} : ProfilePageProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const { user, setUser } = useUser();
    
    const [userToEdit, setUserToEdit] = useState<User|null>(null);

    const handleUserSaved = (updatedUser: React.SetStateAction<User | undefined>) => {
      setUser(updatedUser);
    }

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
    <div className="flex-grow p-6">
      <div className="bg-white rounded-lg shadow p-4">
      <UserIcon className="w-8 h-8 text-blue-500 mr-3" />
        <div className="text-2xl font-semibold mb-4"> Profile</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User Details */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Personal Details</h3>
            <p><strong>Name:</strong> {user!.fullName || "Not provided"}</p>
            <p><strong>Age:</strong> {user!.age || "Not provided"}</p>
            <p><strong>Weight:</strong> {user!.weight ? `${user!.weight} kg` : "Not provided"}</p>
          </div>
          {/* Performance */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Performance</h3>
            <p><strong>Squat:</strong> {user!.bestSquat ? `${user!.bestSquat} kg` : "Not provided"}</p>
            <p><strong>Bench Press:</strong> {user!.bestBenchPress ? `${user!.bestBenchPress} kg` : "Not provided"}</p>
            <p><strong>Deadlift:</strong> {user!.bestDeadlift ? `${user!.bestDeadlift} kg` : "Not provided"}</p>
            <p><strong>Total:</strong> {user!.bestTotal ? `${user!.bestTotal} kg` : "Not provided"}</p>
            
          </div>
          {/* Goals */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-semibold text-lg mb-2">Goals</h3>
            <p><strong>Squat:</strong> {user!.squatGoal ? `${user!.squatGoal} kg` : "Not provided"}</p>
            <p><strong>Bench Press:</strong> {user!.benchPressGoal ? `${user!.benchPressGoal} kg` : "Not provided"}</p>
            <p><strong>Deadlift:</strong> {user!.deadliftGoal ? `${user!.deadliftGoal} kg` : "Not provided"}</p>
            <p><strong>Total:</strong> {user!.totalGoal ? `${user!.totalGoal} kg` : "Not provided"}</p>
          </div>
        </div>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setUserToEdit(user!)}>
          Edit Profile
        </button>
      </div>
      {userToEdit &&
      <EditUserForm
      userToEdit={userToEdit}
      onClose={() => setUserToEdit(null)}
      onUserSaved={(updatedUser) =>{
        handleUserSaved(updatedUser);
        setUserToEdit(null)
      }}/>}
    </div>
  </div>
</div>
      );
    }
    
    export default ProfilePage;
    