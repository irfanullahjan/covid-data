"use client";

import { useEffect, useState } from "react";
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
import { Loading } from "~/common/components/Loading";
import { useFetch } from "~/common/hooks/useFetch";

export function Chart() {
  const [fetcher, loading] = useFetch();
  const [data, setData] = useState();

  const regions = ["North America", "South America", "Europe"];
  const colors = ["red", "blue", "green", "orange", "purple", "yellow", "pink"];

  useEffect(() => {
    fetcher(
      `/covid-log/time-series?regionType=location&regions=${regions.join(
        ","
      )}&field=total_cases_per_million`
    )
      .then((res) => res.json())
      .then(setData)
      .catch((err) => {
        console.error(err);
        alert("Error fetching data");
      });
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <LineChart
      width={1200}
      height={800}
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
      {regions.map((region, i) => (
        <Line
          key={region}
          type="monotone"
          dataKey={region}
          stroke={colors[i % colors.length]}
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>
  );
}
