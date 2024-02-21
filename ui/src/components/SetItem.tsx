import React from 'react';
import { Set } from '../models/set';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { CopyIcon } from 'lucide-react';

type SetItemProps = {
  set: Set;
  onDeleteSetClicked: (set: Set) => void,
  onSetClickedEdit: (set: Set) => void,
  onSetClickedCopy: (set: Set) => void,
};

export const SetItem: React.FC<SetItemProps> = ({ set, onDeleteSetClicked, onSetClickedEdit, onSetClickedCopy }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="px-4 py-2 border">{set.exerciseName}</td>
      <td className="px-4 py-2 border">{set.weight} kg</td>
      <td className="px-4 py-2 border">{set.repetitions}</td>
      <td className="px-4 py-2 border">{set.rpe}</td>
      <td className="px-4 py-2 border">{new Date(set.date).toLocaleDateString()}</td>
      <td className="px-4 py-2 border text-right">
      <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => onSetClickedCopy(set)}>
          <CopyIcon className="h-5 w-5 inline" />
        </button>
        <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => onSetClickedEdit(set)}>
          <PencilIcon className="h-5 w-5 inline" />
        </button>
        <button className="text-red-500 hover:text-red-700" onClick={() => onDeleteSetClicked(set)}>
          <TrashIcon className="h-5 w-5 inline" />
        </button>
      </td>
    </tr>
  );
};

export default SetItem;
