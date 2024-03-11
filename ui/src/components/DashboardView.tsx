import { useEffect, useState } from 'react';
import { Set as SetModel } from '../models/set';
import PBComparisonChart from "./PBComparisonChart";
import { useUser } from "./UserContext";
import VolumeOverTimeChart from './VolumeOverTimeChart';
import { RpeOverTimeChart } from './RpeOverTimeChart';
import { CategoryPills } from './CategoryPills';
import * as UsersApi from '../network/users_api';

interface DashboardViewProps {
  sets: SetModel [];
}

// Interface and RPE chart for ORM estimate
interface RpeChart {
  [key: string]: { [key: string]: number };
}

const rpeChart: RpeChart = {
  "10": {"1": 100, "2": 95.5, "3": 92.2, "4": 89.2, "5": 86.3, "6": 83.7, "7": 81.1, "8": 78.6, "9": 76.2, "10": 73.9, "11": 70.7, "12": 68.0},
  "9.5": {"1": 97.8, "2": 93.9, "3": 90.7, "4": 87.8, "5": 85.0, "6": 82.4, "7": 79.9, "8": 77.4, "9": 75.1, "10": 72.3, "11": 69.4, "12": 66.7},
  "9": {"1": 95.5, "2": 92.2, "3": 89.2, "4": 86.3, "5": 83.7, "6": 81.1, "7": 78.6, "8": 76.2, "9": 73.9, "10": 70.7, "11": 68.0, "12": 65.3},
  "8.5": {"1": 93.9, "2": 90.7, "3": 87.8, "4": 85.0, "5": 82.4, "6": 79.9, "7": 77.4, "8": 75.1, "9": 72.3, "10": 69.4, "11": 66.7, "12": 64.0},
  "8": {"1": 92.2, "2": 89.2, "3": 86.3, "4": 83.7, "5": 81.1, "6": 78.6, "7": 76.2, "8": 73.9, "9": 70.7, "10": 68.0, "11": 65.3, "12": 62.6},
  "7.5": {"1": 90.7, "2": 87.8, "3": 85.0, "4": 82.4, "5": 79.9, "6": 77.4, "7": 75.1, "8": 72.3, "9": 69.4, "10": 66.7, "11": 64.0, "12": 61.3},
  "7": {"1": 89.2, "2": 86.3, "3": 83.7, "4": 81.1, "5": 78.6, "6": 76.2, "7": 73.9, "8": 70.7, "9": 68.0, "10": 65.3, "11": 62.6, "12": 59.9},
  "6.5": {"1": 87.8, "2": 85.0, "3": 82.4, "4": 79.9, "5": 77.4, "6": 75.1, "7": 72.3, "8": 69.4, "9": 66.7, "10": 64.0, "11": 61.3, "12": 58.6},
};

export const DashboardView = ({ sets } : DashboardViewProps) => {

  // Function to extract unique exercise names for categories
function extractUniqueExercises(sets: SetModel[]): string[] {
  const uniqueExercises = new Set<string>();

  uniqueExercises.add("All");
  
  sets.forEach(set => {
      uniqueExercises.add(set.exerciseName);
  });

  // Convert the Set to an array for further processing
  return Array.from(uniqueExercises);
}

// Categories will contain all the different Exercise Names that the user has sets for.
const categories = extractUniqueExercises(sets);

  // User context
  const { user } = useUser();

  // Rank and goal ranks states
  const [rank, setRank] = useState<number | null>(null);
  const [goalRank, setGoalRank] = useState<number | null>(null);

  // Selected Category state
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Selected Time Frame state
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'year'>('week');

  // States for ORM for big 3 lifts
  const [squatOneRepMaxEstimate, setSquatOneRepMaxEstimate] = useState<number | null>(null);
  const [benchOneRepMaxEstimate, setBenchOneRepMaxEstimate] = useState<number | null>(null);
  const [deadliftOneRepMaxEstimate, setDeadliftOneRepMaxEstimate] = useState<number | null>(null);

// Updates the ranks if the user edits their profile
// TODO ? Could use useCallBack method instead ?
  useEffect(() => {
    const rankRequestData: UsersApi.RankRequestData = {
      total: user && user.bestTotal ? Number(user.bestTotal) : 0,
      age: user && user.age ? Number(user.age) : 0,
      weightClass: user && user.weight ? Number(user.weight) : 0,
      sex: user && user.sex ? (user.sex === 'Male' ? 'M' : 'F') : 'M'
};

const goalRankRequestData: UsersApi.RankRequestData = {
  total: user && user.totalGoal ? Number(user.totalGoal) : 0,
  age: user && user.age ? Number(user.age) : 0,
  weightClass: user && user.weight ? Number(user.weight) : 0,
  sex: user && user.sex ? (user.sex === 'Male' ? 'M' : 'F') : 'M'
};

    UsersApi.getUserRank(rankRequestData)
        .then(rank => setRank(rank))
        .catch(error => console.error(error));
    
    UsersApi.getUserRank(goalRankRequestData)
      .then(goalRank => setGoalRank(goalRank))
      .catch(error => console.error(error));
},[user]);


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

// This const contains the sets filetered by the selected Time frame
const timeFilteredSets = filterSetsByTimeFrame(timeFrame);




// This function is to calculate the One Rep Max from one set based on the RPE Chart above
const calculateOneRepMax = async (setData: SetModel) => {
  const weightNum = parseFloat(setData.weight);
  const repetitions = parseInt(setData.repetitions, 10).toString();
  const rpe = Number(setData.rpe).toString();

  // console.log(`RPE Num: ${rpeNum}`);
  // console.log(`Repetitions Num: ${repetitionsNum}`); 

  if (isNaN(weightNum) || isNaN(parseInt(repetitions, 10)) || isNaN(parseFloat(rpe))) {
    return 'Invalid input';
  }

  const rpeRow = rpeChart[rpe];
  // console.log(`RPE Row:`, rpeRow); // Logging the row retrieved from the chart
  if (!rpeRow) {
    return 'Invalid RPE value';
  }

  const percentage = rpeRow[repetitions];

  // console.log(`Percentage: ${percentage}`); // Logging the percentage
  if (percentage === undefined) {
    return 'Invalid repetitions count';
  }

  const oneRepMax = weightNum * 100 / percentage;
  return oneRepMax;
};

// This function calculates the Average One Rep Max from a set of One Rep Max estimate
// TODO ? Use useMemo() same, no need to be re-run on every render ?
const calculateAverageOneRepMax = async (sets: SetModel[]) => {
  let totalOneRepMax = 0;
  let validSetsCount = 0;

  // Calculate 1RM for each set and accumulate
  for (const setData of sets) {
    const oneRepMaxResult = await calculateOneRepMax(setData);
    if (typeof oneRepMaxResult === 'number') {
      totalOneRepMax += oneRepMaxResult;
      validSetsCount++;
    }
    // We just ignore if the oneRepMaxResult is not a number.
  }

   // Compute the average if there are valid sets
   if (validSetsCount > 0) {
    const averageOneRepMax = totalOneRepMax / validSetsCount;
    // Convert to a string with 1 decimal place, then back to a float
    return parseFloat(averageOneRepMax.toFixed(1));
  }

  // If there is no valid sets, will return -1
  return -1;
}

// This function creates a dataset from sets to be used for AverageOneRepMax Estimator
const filterSetsForOneRepMax = (sets: SetModel []) => {
  const squatOneRepMaxSets = sets.filter(set => set.exerciseName === 'Squat');
  const benchOneRepMaxSets = sets.filter(set => set.exerciseName === 'Bench Press');
  const deadliftOneRepMaxSets = sets.filter(set => set.exerciseName === 'Deadlift');

  // Returns an object with three arrays, each containing sets for one of the exercises
  return {
      squatOneRepMaxSets,
      benchOneRepMaxSets,
      deadliftOneRepMaxSets
  };
};

// Call the function and store the result
const { squatOneRepMaxSets, benchOneRepMaxSets, deadliftOneRepMaxSets } = filterSetsForOneRepMax(timeFilteredSets);

// console.log(squatOneRepMaxSets);
// console.log(benchOneRepMaxSets);
// console.log(deadliftOneRepMaxSets);

// Calculates the Average One Rep Max every time those set changes
useEffect(() => {
  calculateAverageOneRepMax(squatOneRepMaxSets).then(estimate => {
    // Update state with the resolved value
    setSquatOneRepMaxEstimate(estimate);
  }).catch(error => {
    console.error(error);
  });

  calculateAverageOneRepMax(benchOneRepMaxSets).then(estimate2 => {
    // Update state with the resolved value
    setBenchOneRepMaxEstimate(estimate2);
  }).catch(error => {
    console.error(error);
  });

  calculateAverageOneRepMax(deadliftOneRepMaxSets).then(estimate3 => {
    // Update state with the resolved value
    setDeadliftOneRepMaxEstimate(estimate3);
  }).catch(error => {
    console.error(error);
  });
}, [squatOneRepMaxSets, benchOneRepMaxSets, deadliftOneRepMaxSets, sets]);


// Function to filter sets by the selected category
const filterSetsByCategory = (sets: SetModel[], selectedCategory: string) => {
  if (selectedCategory === "All"){
    return sets;
  }else{
    return sets.filter(set => set.exerciseName === selectedCategory);
  }
  
};
// const contains the sets for the selected category
// TODO ? Maybe use useMemo to prevent re-computation on every render ?
const categoryFilteredSets = filterSetsByCategory(timeFilteredSets, selectedCategory);


  // Data for the PB comparison to goals chart
  const PBdata = [
    { name: 'Squat', current: Number(user!.bestSquat || 0), goal: Number(user!.squatGoal || 0) },
    { name: 'Bench Press', current: Number(user!.bestBenchPress || 0), goal: Number(user!.benchPressGoal || 0) },
    { name: 'Deadlift', current: Number(user!.bestDeadlift || 0), goal: Number(user!.deadliftGoal || 0) },
  ];

  // Data for the Volume over time chart
  // Function to parse and sum the volume of sets by exercise
  const calculateVolumeByDate = (sets: SetModel[], exerciseName: string) => {
  const volumeByDate: Record<string, number> = {};

  sets.forEach((set) => {
    if (set.exerciseName === exerciseName) {
      const date = set.date.split('T')[0];
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
// console.log(deadliftVolumeData);

let selectedExerciseVolumeData: any[] = [];

// If selected Category is not the first 4 options here, we calculate the volume for that exercise
if (selectedCategory !== "Squat" && selectedCategory !== "Bench Press" && selectedCategory !== "Deadlift"
&& selectedCategory !== "All") {
   selectedExerciseVolumeData = calculateVolumeByDate(categoryFilteredSets, selectedCategory);
  // console.log(categoryFilteredSets[0].exerciseName === selectedCategory);
}
// console.log(selectedExerciseVolumeData);


// Aggregate all dates from all exercises into a single Set (to avoid duplicates)
const allDates = new Set([
  ...squatVolumeData.map((data) => data.date),
  ...benchPressVolumeData.map((data) => data.date),
  ...deadliftVolumeData.map((data) => data.date),
  ...selectedExerciseVolumeData.map((data) => data.date),
]);

// Convert the Set back to an array and sort dates
const sortedDates = Array.from(allDates).sort();

// Now map over the sorted dates to compile the data
const volumeOverTimeData = sortedDates.map((date) => ({
  date: date,
  squatVolume: squatVolumeData.find((squat) => squat.date === date)?.volume || 0,
  benchPressVolume: benchPressVolumeData.find((bp) => bp.date === date)?.volume || 0,
  deadliftVolume: deadliftVolumeData.find((dl) => dl.date === date)?.volume || 0,
  selectedExerciseVolume: selectedExerciseVolumeData.find((dl) => dl.date === date)?.volume || 0,
}));
// console.log(volumeOverTimeData);


// Data for the RPE per date chart
  // Function to parse and sum the avergae rpe by dates
  const calculateAverageRpeByDate = (sets: SetModel[]) => {

    const rpeTotalsByDate: Record<string, { totalRpe: number, count: number }> = {};
  
    sets.forEach((set) => {
      const date = set.date.split('T')[0];
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
    <div className="container mx-auto rounded-lg shadow-lg overflow-hidden">
  <div className="flex flex-col w-full mb-4">
    <h2 className="text-3xl md:text-2xl font-bold mb-4 px-4 md:px-0 text-center">Welcome back to your Dashboard, {user!.username}!</h2>
    <div className="flex flex-col items-center md:items-start">
      <div className='w-full flex justify-center md:justify-start p-1 md:p-2'>
        <CategoryPills categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
      </div>
      <div className="w-full py-2 flex justify-center">
        <select 
          value={timeFrame} 
          onChange={e => setTimeFrame(e.target.value as 'week')}
          className="block w-64 px-3 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-lg cursor-pointer"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>
    </div>
  </div>

  {/* Div for the 2 cards below */}
  <div className='flex justify-center flex-wrap gap-4 mb-8'>
{/* Ranking card */}
  <div className='w-full sm:w-2/5 bg-white border border-gray-200 shadow-lg rounded-lg p-4 '>
  <h3 className="text-lg font-semibold">{user!.fullName}</h3>
  {rank !== null 
    ? <p className='text-gray-600 '>Current worldwide ranking in 2024: <span className="text-gray-800 font-medium">{rank}</span></p> 
    : <p className="text-gray-600">Loading your rank...</p>
  }
  {goalRank !== null 
    ? <p className='text-gray-600 '>If you reach your goals you would be ranked: <span className="text-gray-800 font-medium">{goalRank}</span></p> 
    : <p className="text-gray-600">Loading your Goal rank...</p>
  }
</div>
{/* One Rep Maxes card */}
<div className='w-full sm:w-2/5 bg-white border border-gray-200 shadow-lg rounded-lg p-4'>
  <h3 className="text-lg font-semibold">One Rep Maxes estimates</h3>
  {squatOneRepMaxEstimate !== -1 
    ? <p className='text-gray-600 '>Squat One Rep Max Estimate: <span className="text-gray-800 font-medium">{squatOneRepMaxEstimate} kg</span></p> 
    : <p className="text-gray-600">You don't have any rpe 6+ sets in the selected timeframe for Squat</p>
  }
  {benchOneRepMaxEstimate !== -1 
    ? <p className='text-gray-600 '>Bench Press One Rep Max Estimate: <span className="text-gray-800 font-medium">{benchOneRepMaxEstimate} kg</span></p> 
    : <p className="text-gray-600">You don't have any rpe 6+ sets in the selected timeframe for Bench press</p>
  }
  {deadliftOneRepMaxEstimate !== -1 
    ? <p className='text-gray-600 '>Deadlift One Rep Max Estimate: <span className="text-gray-800 font-medium">{deadliftOneRepMaxEstimate} kg</span></p> 
    : <p className="text-gray-600">You don't have any rpe 6+ sets in the selected timeframe for Deadlift</p>
  }
</div>
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
