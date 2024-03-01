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
  <div className="relative top-20 mx-auto p-5 border w-auto sm:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
    <div className="mt-3 text-center">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Edit User
      </h3>
      <form className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            id="fullName"
            type="text"
            placeholder="Full Name"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("fullName")}
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input
            id="age"
            type="number"
            placeholder="Age"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("age")}
          />
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
          <input
            id="weight"
            type="text" // Changed to text to allow floats
            placeholder="Weight"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("weight")}
          />
        </div>
        <div>
          <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sex</label>
          <input
            id="sex"
            type="text"
            placeholder="Sex"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("sex")}
          />
        </div>
        <div>
          <label htmlFor="bestSquat" className="block text-sm font-medium text-gray-700">Best Squat</label>
          <input
            id="bestSquat"
            type="text" // Changed to text to allow floats
            placeholder="Best Squat"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("bestSquat")}
          />
        </div>
        <div>
          <label htmlFor="bestBenchPress" className="block text-sm font-medium text-gray-700">Best Bench Press</label>
          <input
            id="bestBenchPress"
            type="text" // Changed to text to allow floats
            placeholder="Best Bench"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("bestBenchPress")}
          />
        </div>
        <div>
          <label htmlFor="bestDeadlift" className="block text-sm font-medium text-gray-700">Best Deadlift</label>
          <input
            id="bestDeadlift"
            type="text" // Changed to text to allow floats
            placeholder="Best Deadlift"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("bestDeadlift")}
          />
        </div>
        <div>
          <label htmlFor="bestTotal" className="block text-sm font-medium text-gray-700">Best Total</label>
          <input
            id="bestTotal"
            type="text" // Changed to text to allow floats
            placeholder="Best Total"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("bestTotal")}
          />
        </div>
        <div>
          <label htmlFor="squatGoal" className="block text-sm font-medium text-gray-700">Squat Goal</label>
          <input
            id="squatGoal"
            type="text" // Changed to text to allow floats
            placeholder="Squat Goal"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("squatGoal")}
          />
        </div>
        <div>
          <label htmlFor="benchPressGoal" className="block text-sm font-medium text-gray-700">Bench Press Goal</label>
          <input
            id="benchPressGoal"
            type="text" // Changed to text to allow floats
            placeholder="Bench Goal"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("benchPressGoal")}
          />
        </div>
        <div>
          <label htmlFor="deadliftGoal" className="block text-sm font-medium text-gray-700">Deadlift Goal</label>
          <input
            id="deadliftGoal"
            type="text" // Changed to text to allow floats
            placeholder="Deadlift Goal"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("deadliftGoal")}
          />
        </div>
        <div>
          <label htmlFor="totalGoal" className="block text-sm font-medium text-gray-700">Total Goal</label>
          <input
            id="totalGoal"
            type="text" // Changed to text to allow floats
            placeholder="Total Goal"
            className="mt-1 p-2 border rounded-md w-full"
            required
            {...register("totalGoal")}
          />
        </div>
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