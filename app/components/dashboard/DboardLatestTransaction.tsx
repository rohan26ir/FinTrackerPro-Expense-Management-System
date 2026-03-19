'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const DboardLatestTransaction = () => {
  
  const data = [
    { name: 'Jan', pv: 2400, uv: 4000 },
    { name: 'Feb', pv: 1398, uv: 3000 },
    { name: 'Mar', pv: 9800, uv: 2000 },
    { name: 'Apr', pv: 3908, uv: 2780 },
    { name: 'May', pv: 4800, uv: 1890 },
    { name: 'Jun', pv: 3800, uv: 2390 },
    { name: 'Jul', pv: 4300, uv: 3490 },
  ];

  return (
    <div className="w-full max-w-400 mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Latest Transactions</h2>
          <div className="flex space-x-2  text-black">
            <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">
              Weekly
            </button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700">
              Monthly
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">
              Yearly
            </button>
          </div>
        </div>
        
        <div className="h-100 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: '#666' }} />
              <YAxis tick={{ fill: '#666' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" radius={[4, 4, 0, 0]} name="Income" />
              <Bar dataKey="uv" fill="#82ca9d" radius={[4, 4, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DboardLatestTransaction;