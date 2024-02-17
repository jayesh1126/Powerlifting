import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PBDataPoint {
    name: string; // e.g., "Squat", "Bench Press"
    current: number; // Current personal best
    goal: number; // Goal personal best
  }
  
  interface PBComparisonChartProps {
    data: PBDataPoint[];
  }

export const PBComparisonChart = ({ data } : PBComparisonChartProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="current" fill="#8884d8" name="Current PB" />
      <Bar dataKey="goal" fill="#82ca9d" name="Goal PB" />
    </BarChart>
  </ResponsiveContainer>
);

export default PBComparisonChart;
