import { User } from "../models/user";
import { Set } from '../models/set';
import PBComparisonChart from "./PBComparisonChart";


interface DashboardViewProps {
  loggedInUser: User,
  sets: Set[];
}



export const DashboardView = ({loggedInUser, sets} : DashboardViewProps) => {

  const data = [
    { name: 'Squat', current: Number(loggedInUser.bestSquat || 0), goal: Number(loggedInUser.squatGoal || 0) },
    { name: 'Bench Press', current: Number(loggedInUser.bestBenchPress || 0), goal: Number(loggedInUser.benchPressGoal || 0) },
    { name: 'Deadlift', current: Number(loggedInUser.bestDeadlift || 0), goal: Number(loggedInUser.deadliftGoal || 0) },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-xl font-bold mb-4">
        Welcome back to your Dashboard, { loggedInUser.username} !
      </div>
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Graph showing PBs vs. Goals */}
          <div className="col-span-full lg:col-span-2 xl:col-span-3 p-4">
            <div className="relative h-64"> {/* Adjust height as needed */}
              <PBComparisonChart data={data} />
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
