"use client";

import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "reactstrap";
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
import { useFetch } from "~/common/hooks/useFetch";

export function Chart() {
  const [fetcher, loading] = useFetch();
  const [data, setData] = useState();

  useEffect(() => {
    fetcher(
      "/covid-log/totals-series-by-region?regionType=location&regions=Pakistan&field=total_cases"
    )
      .then((res) => res.json())
      .then(setData)
      .catch((err) => {
        console.error(err);
        alert("Error fetching data");
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <LineChart
      width={500}
      height={300}
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
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Pakistan"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
