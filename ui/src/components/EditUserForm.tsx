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
          console.error('Failed to update user:', error);
          alert('An error occurred while updating your information. Please try again.');
        }
    }


    return (
<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
  <div className="relative top-20 mx-auto p-5 border w-auto sm:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
    <div className="mt-3 text-center">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Edit User
      </h3>
      {/* Form */}
      <form className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>

        {/* Div for Full name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("fullName")}
          />
        </div>

        {/* Div for Age */}
        <div>
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          className="mt-1 p-2 border rounded-md w-full"
          required
          {...register("age", { min: 0, max: 130 })}
        />
      </div>

      {/* Div for Weight */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
        <input
          type="text"
          pattern="^[1-9]\d*(\.\d+)?$"
          placeholder="Current Bodyweight"
          title="Please enter a valid weight in kg (e.g., 75 or 75.5)"
          className="mt-1 p-2 border rounded-md w-full"
          required
          {...register("weight", { min: 0 })}
        />
      </div>

      {/* Div for Sex */}
        <div>
        <label className="block text-sm font-medium text-gray-700">Sex</label>
        <select
          className="mt-1 p-2 border rounded-md w-full"
          required
          {...register("sex")}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Div for best Squat */}
        <div>
          <label htmlFor="bestSquat" className="block text-sm font-medium text-gray-700">Best Squat</label>
          <input
            type="text"
            placeholder="Best Squat"
            pattern="^[1-9]\d*(\.\d+)?$"
            title="Please enter a valid weight in kg (e.g., 75 or 75.5)"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("bestSquat")}
          />
        </div>

        {/* Div for best Bench */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Best Bench Press</label>
          <input
            type="text"
            placeholder="Best Bench"
            pattern="^[1-9]\d*(\.\d+)?$"
            title="Please enter a valid weight in kg (e.g., 75 or 75.5)"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("bestBenchPress")}
          />
        </div>

        {/* Div for best Deadlift */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Best Deadlift</label>
          <input
            type="text"
            placeholder="Best Deadlift"
            pattern="^[1-9]\d*(\.\d+)?$"
            title="Please enter a valid weight in kg (e.g., 75 or 75.5)"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("bestDeadlift")}
          />
        </div>

        {/* Div for best Total */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Best Total</label>
          <input
            type="text"
            placeholder="Best Total"
            pattern="^[1-9]\d*(\.\d+)?$"
            title="Please enter a valid weight in kg (e.g., 75 or 75.5)"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("bestTotal")}
          />
        </div>

        {/* Div for Squat goal */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Squat Goal</label>
          <input
            type="text"
            placeholder="Squat Goal"
            pattern="^[1-9]\d*(\.\d+)?$"
            title="Please enter a valid weight in kg (e.g., 75 or 75.5)"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("squatGoal")}
          />
        </div>

        {/* Div for Bench goal */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Bench Press Goal</label>
          <input
            type="text"
            placeholder="Bench Goal"
            pattern="^[1-9]\d*(\.\d+)?$"
            title="Please enter a valid weight in kg (e.g., 75 or 75.5)"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("benchPressGoal")}
          />
        </div>

        {/* Div for Deadlift goal */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Deadlift Goal</label>
          <input
            type="text"
            placeholder="Deadlift Goal"
            pattern="^[1-9]\d*(\.\d+)?$"
            title="Please enter a valid weight in kg (e.g., 75 or 75.5)"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("deadliftGoal")}
          />
        </div>

        {/* Div for Total goal */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Goal</label>
          <input
            type="text"
            placeholder="Total Goal"
            pattern="^[1-9]\d*(\.\d+)?$"
            title="Please enter a valid weight in kg (e.g., 75 or 75.5)"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("totalGoal")}
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Edit User
          </button>
        </div>
        <div className="md:col-span-2">
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

        );
  };




  export default EditUserForm;