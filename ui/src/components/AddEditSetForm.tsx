import { Set } from "../models/set";
import { useForm } from 'react-hook-form';
import { SetInput } from '../network/sets_api';
import * as SetsApi from "../network/sets_api";

interface AddEditSetFormProps {
    setToEdit?: Set,
    onClose: () => void;
    onSetSaved: (set: Set) => void,
  }
  
  
  const AddEditSetForm = ({setToEdit, onClose, onSetSaved}: AddEditSetFormProps) => {
    const {register, handleSubmit, formState: { isSubmitting} } = useForm<SetInput>({
      defaultValues:{
        exerciseName: setToEdit?.exerciseName || "",
        weight: setToEdit?.weight || "",
        repetitions: setToEdit?.repetitions || "",
        rpe: setToEdit?.rpe || "",
        date: setToEdit?.date.substring(0,10) || "",
      }
    });

    async function onSubmit(input: SetInput){
        try {
          let setResponse: Set;
          if (setToEdit){
            setResponse = await SetsApi.updateSet(setToEdit._id, input);
          } else{
            setResponse = await SetsApi.createSet(input);
          }
          onSetSaved(setResponse);
        } catch (error) {
            console.error(error);
            alert(error);            
        }
    }

    return (
      <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
  <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
    <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
      {setToEdit ? "Edit Set" : "Add Set"}
    </h3>
    <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Exercise Name"
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
        required
        {...register("exerciseName")}
      />
      <input
        type="text" // Changed to text to handle float values properly
        placeholder="Weight (e.g., 75.5)"
        pattern="[0-9]*[.,]?[0-9]+" // Allow integers and floats
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
        required
        {...register("weight", { valueAsNumber: true })}
      />
      <input
        type="text" // Changed to text to handle float values properly
        placeholder="Repetitions (e.g., 8 or 8.5)"
        pattern="[0-9]*[.,]?[0-9]+" // Allow integers and floats
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
        required
        {...register("repetitions", { valueAsNumber: true })}
      />
      <input
        type="text" // Changed to text to handle float values properly
        placeholder="RPE (e.g., 7 or 7.5)"
        pattern="[0-9]*[.,]?[0-9]+" // Allow integers and floats
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
        required
        {...register("rpe", { valueAsNumber: true })}
      />
      <input
        type="date"
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
        required
        {...register("date")}
      />
      <div className="flex items-center justify-between gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {setToEdit ? "Save Changes" : "Add Set"}
        </button>
        <button
          type="button"
          className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>

    );
  };

export default AddEditSetForm;