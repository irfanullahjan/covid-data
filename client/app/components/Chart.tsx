"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: any;
  dataKeys: string[];
};

export function Chart({ data, dataKeys }: Props) {
  return (
    <div>
      <LineChart
        width={900}
        height={600}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          tickFormatter={(tick) => {
            if (tick >= 1000000) {
              return `${tick / 1000000}M`;
            }
            if (tick >= 1000) {
              return `${tick / 1000}K`;
            }
            return tick;
          }}
        />
        <Tooltip />
        <Legend />
        {dataKeys.map((key) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </div>
  );
}
