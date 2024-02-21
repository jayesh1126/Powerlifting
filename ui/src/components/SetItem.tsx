import React from 'react';
import { Set } from '../models/set';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Set as SetModel } from "../models/set";

type SetItemProps = {
  set: Set;
  onDeleteSetClicked: (set: SetModel) => void,
  onSetClicked: (set: SetModel) => void,
  // Add any additional props you might need for handlers
};

export const SetItem: React.FC<SetItemProps> = ({ set, onDeleteSetClicked, onSetClicked }) => {
  // Function handlers for edit and delete would be added here

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 transition duration-200 ease-in-out hover:shadow-lg">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-xl font-semibold">{set.exerciseName}</h3>
    <div>
      <button className="text-blue-500 hover:text-blue-700 mr-2"
        onClick={() => onSetClicked(set)}>
        <PencilIcon className="h-5 w-5 inline" />
      </button>
      <button className="text-red-500 hover:text-red-700"
        onClick={(e) => {
          onDeleteSetClicked(set);
          e.stopPropagation();
        }}>
        <TrashIcon className="h-5 w-5 inline" />
      </button>
    </div>
  </div>
  <ul className="list-disc pl-5">
    <li><strong>Weight:</strong> {set.weight} kg</li>
    <li><strong>Repetitions:</strong> {set.repetitions}</li>
    <li><strong>RPE:</strong> {set.rpe}</li>
    <li><strong>Date:</strong> {new Date(set.date).toLocaleDateString()}</li>
  </ul>
</div>

  );
};

export default SetItem;
