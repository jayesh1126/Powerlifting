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
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {setToEdit ? "Edit Set" : "Add Set"}
            </h3>
            <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Exercise Name"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("exerciseName")}
              />
              <input
                type="number"
                placeholder="Weight"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("weight")}
              />
              <input
                type="number"
                placeholder="Repetitions"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("repetitions")}
              />
              <input
                type="number"
                placeholder="RPE"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("rpe")}
              />
              <input
                type="date"
                className="mt-2 p-2 border rounded-md w-full"
                required
                {...register("date")}
              />
              <div className="items-center px-4 py-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  {setToEdit ? "Edit Set" : "Add Set"}
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

export default AddEditSetForm;