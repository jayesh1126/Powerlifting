import React, { useState } from 'react';
import { User } from '../models/user';
import DefaultSidebar from '../components/DefaultSidebar';
import { PageHeader } from '../layouts/PageHeader';
import EditUserForm from '../components/EditUserForm';
import { useUser } from '../components/UserContext';
import profileImage from '../assets/img.webp';


interface ProfilePageProps {
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
        <div className='  flex flex-col h-screen overflow-hidden'>
          <PageHeader toggleSidebar={toggleSidebar} />
          <div className='flex flex-1 overflow-auto'>
            {isSidebarOpen && (
              <DefaultSidebar />
            )}
            <div className="flex-grow p-6">
              <div className="max-w-4xl mx-auto">
                {/* Personal Details Box with colorful background and vibrant button */}
                <div className="rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6 flex flex-col md:flex-row items-center">
                    <img
                      src={profileImage}
                      alt={`${user?.fullName}'s profile`}
                      className="w-32 h-32 rounded-full border-4 border-white mb-4 md:mb-0 md:mr-6"
                    />
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">Personal Details</h3>
                      <p>Name: {user?.fullName || 'Not provided'}</p>
                      <p>Age: {user?.age || 'Not provided'}</p>
                      <p>Weight: {user?.weight ? `${user.weight} kg` : 'Not provided'}</p>
                      <p>Sex: {user?.sex || 'Not provided'}</p>
                    </div>
                  </div>
                  <button
                    className="text-white bg-gray-800 hover:bg-black font-bold py-2 px-4 rounded-b-lg w-full"
                    onClick={() => setUserToEdit(user!)}
                  >
                    Edit Profile
                  </button>
                </div>
    
                {/* Performance and Goals Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Performance Box */}
                  <div className=" rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-2">Performance</h3>
                    <p>Squat: {user?.bestSquat ? `${user.bestSquat} kg` : 'Not provided'}</p>
                    <p>Bench Press: {user?.bestBenchPress ? `${user.bestBenchPress} kg` : 'Not provided'}</p>
                    <p>Deadlift: {user?.bestDeadlift ? `${user.bestDeadlift} kg` : 'Not provided'}</p>
                    <p>Total: {user?.bestTotal ? `${user.bestTotal} kg` : 'Not provided'}</p>
                  </div>
    
                  {/* Goals Box */}
                  <div className=" rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold mb-2">Goals</h3>
                    <p>Squat: {user?.squatGoal ? `${user.squatGoal} kg` : 'Not provided'}</p>
                    <p>Bench Press: {user?.benchPressGoal ? `${user.benchPressGoal} kg` : 'Not provided'}</p>
                    <p>Deadlift: {user?.deadliftGoal ? `${user.deadliftGoal} kg` : 'Not provided'}</p>
                    <p>Total: {user?.totalGoal ? `${user.totalGoal} kg` : 'Not provided'}</p>
                  </div>
                </div>
                {userToEdit &&
      <EditUserForm
      userToEdit={userToEdit}
      onClose={() => setUserToEdit(null)}
      onUserSaved={(updatedUser) =>{
        handleUserSaved(updatedUser);
        setUserToEdit(null);
      }}/>}
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default ProfilePage;
    