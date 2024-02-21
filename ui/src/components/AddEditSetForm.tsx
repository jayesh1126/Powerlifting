import { Set } from "../models/set";
import { useForm } from 'react-hook-form';
import { SetInput } from '../network/sets_api';
import * as SetsApi from "../network/sets_api";

interface AddEditSetFormProps {
    setToEdit?: Set,
    setToCopy?: Set,
    onClose: () => void;
    onSetSaved: (set: Set) => void,
  }
  
  
  const AddEditSetForm = ({setToEdit, setToCopy, onClose, onSetSaved}: AddEditSetFormProps) => {
    const {register, handleSubmit, formState: { isSubmitting} } = useForm<SetInput>({
      defaultValues:{
        exerciseName: setToEdit?.exerciseName || setToCopy?.exerciseName || "",
        weight: setToEdit?.weight || setToCopy?.weight || "",
        repetitions: setToEdit?.repetitions || setToCopy?.repetitions || "",
        rpe: setToEdit?.rpe || setToCopy?.rpe || "",
        date: setToEdit?.date.substring(0,10) || setToCopy?.date.substring(0,10) || "",
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
                    <label className="block">
                        <span className="text-gray-700">Exercise Name</span>
                        <input
                            list="exercise-names"
                            type="text"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                            {...register("exerciseName")}
                        />
                        <datalist id="exercise-names">
                            {/* Add your exercise options here */}
                            <option value="Squat" />
                            <option value="Deadlift" />
                            <option value="Bench Press" />
                            {/* etc... */}
                        </datalist>
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Weight (kg)</span>
                        <input
                            type="text"
                            pattern="\d+(\.\d+)?"
                            title="Please enter a valid weight in kg (e.g., 75 or 75.5)"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                            {...register("weight")}
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Repetitions</span>
                        <input
                            type="text"
                            pattern="\d+(\.\d+)?"
                            title="Please enter the number of repetitions (e.g., 8 or 8.5)"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                            {...register("repetitions")}
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">RPE (1-10)</span>
                        <input
                            type="text"
                            pattern="^10(\.0+)?|[1-9](\.\d+)?$"
                            title="Please enter a value for RPE between 1 and 10"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                            {...register("rpe")}
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Date</span>
                        <input
                            type="date"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                            {...register("date")}
                        />
                    </label>
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