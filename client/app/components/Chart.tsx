"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { intToColor } from "~/common/utils/numberUtils";

type Props = {
  data: any;
  dataKeys: string[];
};

export function Chart({ data, dataKeys }: Props) {
  const colors = [
    "#8884d8", // blue
    "#82ca9d", // green
    "#ffc658", // yellow
    "#ff7300", // orange
    "#ff0000", // red
    "#000000", // black
    "#0000ff", // blue
    "#00ff00", // green
    "#ffff00", // yellow
    "#ff7f00", // orange
    "#ff0000", // red
    "#000000", // black
  ];
  return (
    <div>
      <ResponsiveContainer width="99%" height={500}>
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
          {dataKeys.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[i % colors.length]}
              activeDot={{ r: 8 }}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
