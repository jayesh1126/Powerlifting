import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface PBDataPoint {
    name: string;
    current: number; 
    goal: number;
  }
  
  interface PBComparisonChartProps {
    data: PBDataPoint[];
  }

export const PBComparisonChart = ({ data } : PBComparisonChartProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis tickFormatter={(value) => `${value} kg`} />
      <Tooltip formatter={(value) => [`${value} kg`]} />
      <Legend formatter={(value) => <span>{value} PB</span>} />
      <Bar dataKey="current" fill="#8884d8" name="Current">
        {
          data.map((entry, index) => (
            <Cell key={`cell-current-${index}`} fill={entry.current >= entry.goal ? '#82ca9d' : '#8884d8'} />
          ))
        }
      </Bar>
      <Bar dataKey="goal" fill="#82ca9d" name="Goal">
        {
          data.map((entry, index) => (
            <Cell key={`cell-goal-${index}`} fill="#82ca9d" />
          ))
        }
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default PBComparisonChart;
