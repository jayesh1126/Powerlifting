import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';


interface VolumeDataPoint {
  date: string;
  squatVolume: number; 
  benchPressVolume: number;
  deadliftVolume: number;
  selectedExerciseVolume: number;
}

interface VolumeOverTimeChartProps {
  data: VolumeDataPoint[];
}

export const VolumeOverTimeChart = ({ data }: VolumeOverTimeChartProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis domain={['dataMin', 'dataMax']} />
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
