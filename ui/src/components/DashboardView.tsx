import { UserIcon } from "@heroicons/react/24/solid";

type UserProfileProps = {
  profileID: number;
  name: string;
  age: number;
  weight: number;
  trainingExperience: number;
  SquatPB: number;
  SquatGoal: number;
  BenchPB: number;
  BenchGoal: number;
  DeadliftPB: number;
  DeadliftGoal: number;
  TotalPB: number;
  TotalGoal: number;
};

export function DashboardView({
  profileID,
  name,
  age,
  weight,
  trainingExperience,
  SquatPB,
  SquatGoal,
  BenchPB,
  BenchGoal,
  DeadliftPB,
  DeadliftGoal,
  TotalPB,
  TotalGoal,
}: UserProfileProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-xl font-bold mb-4">
        Welcome back to your Dashboard, {name}!
      </div>
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* User Profile Block */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start w-full">
            <div className="flex items-center mb-4">
              <UserIcon className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-lg font-semibold">{name}</h2>
            </div>
            <p className="mb-2">Weight: {weight}kg</p>
            <p className="mb-2">Age: {age} years</p>
            <p className="mb-4">Goals: {TotalGoal}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
              Edit Profile
            </button>
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
