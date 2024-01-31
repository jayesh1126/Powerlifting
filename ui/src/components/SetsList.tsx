import React from 'react';
import { SetItem } from './SetItem';
import { Set } from '../models/set';
import { Set as SetModel } from "../models/set";

type SetsListProps = {
  sets: Set[];
  onDeleteSetClicked: (set: SetModel) => void,
};

const groupSetsByDate = (sets: Set[]) => {
  const grouped = sets.reduce((acc, set) => {
    const date = new Date(set.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(set);
    return acc;
  }, {} as Record<string, Set[]>);

  return grouped;
};

export const SetsList: React.FC<SetsListProps> = ({ sets, onDeleteSetClicked }) => {
  const groupedSets = groupSetsByDate(sets);

  // Sort the grouped sets by date in descending order
  const sortedGroupedSets = Object.entries(groupedSets).sort((a, b) => {
    // Converting "DD/MM/YYYY to YYYY-MM/DD" for Date format
    var formattedDateA = a[0].split("/").reverse().join("-");
    var formattedDateB = b[0].split("/").reverse().join("-");
    const dateA = new Date(formattedDateA).getTime();
    const dateB = new Date(formattedDateB).getTime();
    // console.log(formattedDateA);
    // console.log(formattedDateB);
    return dateB - dateA; // For descending order
  });



  return (
    <div>
      {sortedGroupedSets.map(([date, sets]) => (
        <div key={date}>
          <h2 className="text-xl font-bold my-4">{date}</h2>
          {sets.map(set => <SetItem key={set._id} set={set} onDeleteSetClicked={onDeleteSetClicked}/>)}
        </div>
      ))}
    </div>
  );
};

export default SetsList;