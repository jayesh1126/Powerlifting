import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';


interface VolumeDataPoint {
  date: string; // Date of the workout
  squatVolume: number; // Total squat volume
  benchPressVolume: number; // Total bench press volume
  deadliftVolume: number; // Total deadlift volume
  selectedExerciseVolume: number; // Total volume for selected exercise
}

interface VolumeOverTimeChartProps {
  data: VolumeDataPoint[]; // Array of data points for the chart
}

export const VolumeOverTimeChart = ({ data }: VolumeOverTimeChartProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="squatVolume" stroke="#8884d8" name="Squat Volume" />
      <Line type="monotone" dataKey="benchPressVolume" stroke="#82ca9d" name="Bench Press Volume" />
      <Line type="monotone" dataKey="deadliftVolume" stroke="#ffc658" name="Deadlift Volume" />
      <Line type="monotone" dataKey="selectedExerciseVolume" stroke="#ac33ff" name="Selected Exercise Volume" />
    </LineChart>
  </ResponsiveContainer>
);
export default VolumeOverTimeChart;
