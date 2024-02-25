import { User } from "../models/user";
import { useForm } from 'react-hook-form';
import { UserInput } from '../network/users_api';
import * as UsersApi from "../network/users_api";

interface EditUserFormProps {
    userToEdit: User,
    onClose: () => void;
    onUserSaved: (user: User) => void,
  }


  const EditUserForm = ({userToEdit, onClose, onUserSaved}: EditUserFormProps) => {
    const {register, handleSubmit, formState: { isSubmitting } } = useForm<UserInput>({
        defaultValues:{
            fullName: userToEdit?.fullName || "",
            age: userToEdit?.age || "",
            weight: userToEdit?.weight || "",
            sex: userToEdit?.sex || "",
            bestSquat: userToEdit?.bestSquat || "",
            bestBenchPress: userToEdit?.bestBenchPress || "",
            bestDeadlift: userToEdit?.bestDeadlift || "",
            bestTotal: userToEdit?.bestTotal || "",
            squatGoal: userToEdit?.squatGoal || "",
            benchPressGoal: userToEdit?.benchPressGoal || "",
            deadliftGoal: userToEdit?.deadliftGoal || "",
            totalGoal: userToEdit?.totalGoal || "",
    }
});

    async function onSubmit(input :UserInput) {
        try {
            let userResponse: User;
            userResponse = await UsersApi.updateUser(userToEdit._id, input);
            
            onUserSaved(userResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }


    return (
<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Edit User
            </h3>
            <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Full Name"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("fullName")}
              />
              <input
                type="number"
                placeholder="Age"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("age")}
              />
              <input
                type="number"
                placeholder="Weight"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("weight")}
              />
              <input
                type="text"
                placeholder="Sex"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("sex")}
              />
              <input
                type="number"
                placeholder="Best Squat"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("bestSquat")}
              />
              <input
                type="number"
                placeholder="Best Bench"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("bestBenchPress")}
              />
              <input
                type="number"
                placeholder="Best Deadlift"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("bestDeadlift")}
              />
              <input
                type="number"
                placeholder="Best Total"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("bestTotal")}
              />
              <input
                type="number"
                placeholder="Squat Goal"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("squatGoal")}
              />
              <input
                type="number"
                placeholder="Bench Goal"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("benchPressGoal")}
              />
              <input
                type="number"
                placeholder="Deadlift Goal"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("deadliftGoal")}
              />
              <input
                type="number"
                placeholder="Total Goal"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("totalGoal")}
              />
              <div className="items-center px-4 py-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  Edit User
                </button>
              </div>
            </form>
            <div className="items-center px-4 py-3">
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
        );
  };




  export default EditUserForm;