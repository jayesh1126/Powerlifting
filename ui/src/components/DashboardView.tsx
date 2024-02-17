import { useState } from 'react';
import { Set as SetModel } from '../models/set';
import PBComparisonChart from "./PBComparisonChart";
import { useUser } from "./UserContext";
import VolumeOverTimeChart from './VolumeOverTimeChart';


interface DashboardViewProps {
  sets: SetModel [];
}



export const DashboardView = ({ sets } : DashboardViewProps) => {

  const { user } = useUser();

  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'year'>('week');


// This function filters the sets based on the selected time frame
const filterSetsByTimeFrame = (timeFrame: 'week' | 'month' | 'year') => {
  const filteredSets = sets.filter(set => {
    const setDate = new Date(set.date);
    const now = new Date();
    switch (timeFrame) {
      case 'week':
        return setDate >= new Date(now.setDate(now.getDate() - 7));
      case 'month':
        return setDate >= new Date(now.setMonth(now.getMonth() - 1));
      case 'year':
        return setDate >= new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return true;
    }
  });
  return filteredSets;
};
  
const filteredSets = filterSetsByTimeFrame(timeFrame);

  // Data for the PB comparison to goals chart
  const PBdata = [
    { name: 'Squat', current: Number(user!.bestSquat || 0), goal: Number(user!.squatGoal || 0) },
    { name: 'Bench Press', current: Number(user!.bestBenchPress || 0), goal: Number(user!.benchPressGoal || 0) },
    { name: 'Deadlift', current: Number(user!.bestDeadlift || 0), goal: Number(user!.deadliftGoal || 0) },
  ];

  // Data fpr the Volume over time chart
  // Helper function to parse and sum the volume of sets by exercise
  const calculateVolumeByDate = (sets: SetModel[], exerciseName: string) => {
  const volumeByDate: Record<string, number> = {};

  sets.forEach((set) => {
    if (set.exerciseName === exerciseName) {
      const date = set.date.split('T')[0]; // assuming date is in ISO format
      const volume = parseInt(set.weight) * parseInt(set.repetitions);
      if (volumeByDate[date]) {
        volumeByDate[date] += volume;
      } else {
        volumeByDate[date] = volume;
      }
    }
  });

  return Object.entries(volumeByDate).map(([date, volume]) => ({
    date,
    volume,
  }));
};

const squatVolumeData = calculateVolumeByDate(filteredSets, 'Squat');
const benchPressVolumeData = calculateVolumeByDate(filteredSets, 'Bench Press');
const deadliftVolumeData = calculateVolumeByDate(filteredSets, 'Deadlift');
// console.log(squatVolumeData);
// console.log(benchPressVolumeData);

// Aggregate all dates from all exercises into a single Set (to avoid duplicates)
const allDates = new Set([
  ...squatVolumeData.map((data) => data.date),
  ...benchPressVolumeData.map((data) => data.date),
  ...deadliftVolumeData.map((data) => data.date),
]);

// Convert the Set back to an array and sort dates if needed
const sortedDates = Array.from(allDates).sort();

// Now map over the sorted dates to compile the data
const volumeOverTimeData = sortedDates.map((date) => ({
  date: date,
  squatVolume: squatVolumeData.find((squat) => squat.date === date)?.volume || 0,
  benchPressVolume: benchPressVolumeData.find((bp) => bp.date === date)?.volume || 0,
  deadliftVolume: deadliftVolumeData.find((dl) => dl.date === date)?.volume || 0,
}));

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-xl font-bold mb-4">
        Welcome back to your Dashboard, { user!.username} !
        <select value={timeFrame} onChange={e => setTimeFrame(e.target.value as 'week')}>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>
      
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Graph showing PBs vs. Goals */}
          <div className="col-span-full lg:col-span-2 xl:col-span-3 p-4">
            <div className="relative h-64"> {/* Adjust height as needed */}
              <PBComparisonChart data={PBdata} />
            </div>
          </div>
          {/* Graph showing volume over time for SBD */}
          <div className="col-span-full lg:col-span-2 xl:col-span-3 p-4">
            <div className="relative h-64"> {/* Adjust height as needed */}
              <VolumeOverTimeChart data={volumeOverTimeData} />
            </div>
          </div>

          {/* Placeholder for Graphs and Items */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="bg-white rounded-lg shadow-lg p-6 w-full">
              <h2 className="text-lg font-semibold mb-4">Graph {index + 1}</h2>
              <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                Content {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
