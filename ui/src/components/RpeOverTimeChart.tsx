import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RpeDataPoint {
  date: string; // Date of the workout
  averageRpe: number; // Average RPE for the day
}

interface RpeOverTimeChartProps {
  data: RpeDataPoint[]; // Array of data points for the chart
}

export const RpeOverTimeChart = ({ data }: RpeOverTimeChartProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="averageRpe" stroke="#8884d8" name="Average RPE" />
    </LineChart>
  </ResponsiveContainer>
);

export default RpeOverTimeChart;
