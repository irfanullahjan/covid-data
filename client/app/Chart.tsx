"use client";

import { FormikProvider, useFormik } from "formik";
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
import { FormikInput } from "~/common/components/FormikInput";
import { Loading } from "~/common/components/Loading";
import { LoadingFullScreen } from "~/common/components/LoadingFullScreen";
import { useFetch } from "~/common/hooks/useFetch";

export function Chart({
  fields,
}: {
  fields: { name: string; value: string }[];
}) {
  const [fetcher, loading] = useFetch();
  const [data, setData] = useState();

  const regions = ["France", "Germany", "Italy", "Spain"];
  const colors = ["red", "blue", "green", "orange", "purple", "yellow", "pink"];

  const formik = useFormik({
    initialValues: {
      field: "total_cases",
    },
    onSubmit: (values) => {
      fetcher(
        `/covid-log/time-series?regionType=location&regions=${regions.join(
          ","
        )}&field=${values.field}`
      )
        .then((res) => res.json())
        .then(setData)
        .catch((err) => {
          console.error(err);
          alert("Error fetching data");
        });
    },
  });

  useEffect(() => {
    formik.submitForm();
  }, [formik.values.field]);

  return (
    <div>
      <FormikProvider value={formik}>
        <FormikInput name="field" label="Metric" type="select">
          {fields.map((field) => (
            <option key={field.name} value={field.value}>
              {field.name}
            </option>
          ))}
        </FormikInput>
      </FormikProvider>
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
    </div>
  );
}
