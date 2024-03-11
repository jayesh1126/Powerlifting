import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RpeDataPoint {
  date: string;
  averageRpe: number; 
}

interface RpeOverTimeChartProps {
  data: RpeDataPoint[];
}

export const RpeOverTimeChart = ({ data }: RpeOverTimeChartProps) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis allowDecimals={false} domain={['auto', 'auto']} />
      <Tooltip 
        formatter={(value) => [`${value}`, 'Average RPE']}
        labelFormatter={(label) => `Date: ${label}`}
      />
      <Legend verticalAlign="top" height={36} />
      <Line
        type="monotone"
        dataKey="averageRpe"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        name="Average RPE"
      />
    </LineChart>
  </ResponsiveContainer>
);

export default RpeOverTimeChart;
