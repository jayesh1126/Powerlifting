import { useEffect, useState } from 'react';
import { Set as SetModel } from '../models/set';
import PBComparisonChart from "./PBComparisonChart";
import { useUser } from "./UserContext";
import VolumeOverTimeChart from './VolumeOverTimeChart';
import { RpeOverTimeChart } from './RpeOverTimeChart';
import { categories } from '../data/home';
import { CategoryPills } from './CategoryPills';
import * as UsersApi from '../network/users_api';



interface DashboardViewProps {
  sets: SetModel [];
}



export const DashboardView = ({ sets } : DashboardViewProps) => {

  const { user } = useUser();
  const [rank, setRank] = useState<number | null>(null);


  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'year'>('week');


  useEffect(() => {
    const rankRequestData: UsersApi.RankRequestData = {
      total: user && user.bestTotal ? Number(user.bestTotal) : 0,
      age: user && user.age ? Number(user.age) : 0,
      weightClass: user && user.weight ? Number(user.weight) : 0,
      sex: user && user.sex ? (user.sex === 'Male' ? 'M' : 'F') : 'M'
};

    UsersApi.getUserRank(rankRequestData)
        .then(rank => setRank(rank))
        .catch(error => console.error(error));
},);

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
  
const timeFilteredSets = filterSetsByTimeFrame(timeFrame);

// Function to filter sets by the selected category
const filterSetsByCategory = (sets: SetModel[], selectedCategory: string) => {
  if (selectedCategory === "All"){
    return sets;
  }else{
    return sets.filter(set => set.exerciseName === selectedCategory);
  }
  
};

const categoryFilteredSets = filterSetsByCategory(timeFilteredSets, selectedCategory);


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

const squatVolumeData = calculateVolumeByDate(categoryFilteredSets, 'Squat');
const benchPressVolumeData = calculateVolumeByDate(categoryFilteredSets, 'Bench Press');
const deadliftVolumeData = calculateVolumeByDate(categoryFilteredSets, 'Deadlift');
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



// Data for the RPE per date chart
// console.log(filteredSets);
  // Helper function to parse and sum the avergae rpe of dates
  const calculateAverageRpeByDate = (sets: SetModel[]) => {
    const rpeTotalsByDate: Record<string, { totalRpe: number, count: number }> = {};
  
    sets.forEach((set) => {
      const date = set.date.split('T')[0]; // assuming date is in ISO format
      const rpe = parseInt(set.rpe);
      if (rpeTotalsByDate[date]) {
        rpeTotalsByDate[date].totalRpe += rpe;
        rpeTotalsByDate[date].count += 1;
      } else {
        rpeTotalsByDate[date] = { totalRpe: rpe, count: 1 };
      }
    });
  
    return Object.entries(rpeTotalsByDate).map(([date, { totalRpe, count }]) => ({
      date,
      averageRpe: totalRpe / count,
    }));
  };
  
  const AverageRpeByDate = calculateAverageRpeByDate(categoryFilteredSets);
  // console.log(AverageRpeByDate);


  return (
    <div className="container mx-auto rounded-lg shadow-lg">
  <div className="flex flex-col items-center w-full mb-4">
    <h2 className="text-3xl md:text-2xl font-bold mb-4 px-4 md:px-0">Welcome back to your Dashboard, {user!.username}!</h2>
    <div className='flex justify-center p-1 md:justify-start md:p-2'>
      <CategoryPills categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
    </div>


    <div className="w-auto py-2">
      <select 
        value={timeFrame} 
        onChange={e => setTimeFrame(e.target.value as 'week')}
        className="block w-64 mx-auto px-3 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg cursor-pointer"
      >
        <option value="week">Last Week</option>
        <option value="month">Last Month</option>
        <option value="year">Last Year</option>
      </select>
    </div>
  </div>

  <div className='w-full sm:w-2/5 bg-white border border-gray-200 shadow-lg rounded-lg p-4 mt-3 mx-auto'>
  <h3 className="text-lg font-semibold">{user!.fullName}</h3>
  {rank !== null 
    ? <p className='text-gray-600 '>Current worldwide ranking in 2024: <span className="text-gray-800 font-medium">{rank}</span></p> 
    : <p className="text-gray-600">Loading your rank...</p>
  }
</div>

  

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
    {/* Enhance each card with more padding and subtle shadows for depth */}
    <div className="col-span-1 xl:col-span-3 p-8 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">PBs vs Goals</h3>
      <PBComparisonChart data={PBdata} />
    </div>
    <div className="col-span-1 xl:col-span-3 p-8 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Volume Over Time</h3>
      <VolumeOverTimeChart data={volumeOverTimeData} />
    </div>
    <div className="col-span-1 xl:col-span-3 p-8 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">RPE Over Time</h3>
      <RpeOverTimeChart data={AverageRpeByDate} />
    </div>
    {/* Additional Graphs */}
  </div>
</div>


  );
}
