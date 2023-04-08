"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LoadingFullScreen } from "~/common/components/LoadingFullScreen";
import { useFetch } from "~/common/hooks/useFetch";

type Props = {
  region: string;
  field: string;
};

export function Chart({ region, field }: Props) {
  const [fetcher, loading] = useFetch();
  const [data, setData] = useState();

  useEffect(() => {
    fetcher(
      `/covid-log/time-series?regionType=continent&region=${region}&field=${field}`
    )
      .then((res) => res.json())
      .then(setData);
  }, [region, field]);

  return (
    <div>
      {loading && <LoadingFullScreen />}
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
        <Line
          type="monotone"
          dataKey={region}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}
