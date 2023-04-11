"use client";

import { isEqual } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
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
import { LoadingFullScreen } from "~/common/components/LoadingFullScreen";
import { useFetch } from "~/common/hooks/useFetch";
import { formatToThousandsMillions } from "~/common/utils/numberUtils";
import { formatParamArrayToString } from "~/common/utils/urlUtils";
import { FieldOption } from "./FieldsFilter";
import { SearchParams } from "./HomeContent";
import { LocationOption } from "./LocationsFilter";

const colors = [
  "#ff6f61", // red
  "#00b32c", // green
  "#0077be", // blue
  "#ffa600", // orange
  "#f48a1d", // goldenrod
  "#55b9f3", // sky blue
  "#9b4f96", // purple
  "#ed225d", // pink
  "#32384d", // dark gray
  "#a7a9ac", // light gray
];

type Props = {
  searchParams: SearchParams;
  fieldOptions: FieldOption[];
  locationOptions: LocationOption[];
};

function ChartX({ searchParams, fieldOptions, locationOptions }: Props) {
  const [data, setData] = useState([]);
  const [fetcher, loading] = useFetch();
  useEffect(() => {
    const locations = searchParams.locations;
    const fields = searchParams.fields;
    let url = "/covid-log/time-series?";
    url += formatParamArrayToString("locations", locations);
    url += "&";
    url += formatParamArrayToString("fields", fields);
    if (searchParams.from) {
      url += `&from=${searchParams.from}`;
    }
    if (searchParams.to) {
      url += `&to=${searchParams.to}`;
    }
    fetcher(url)
      .then((res) => res.json())
      .then(setData);
  }, [searchParams]);

  const tranformedData = useMemo(
    () =>
      Object.values(
        data.reduce((acc: any, cur: any) => {
          if (!acc[cur.date]) {
            acc[cur.date] = {
              date: cur.date,
            };
          }
          if (searchParams.baseLine === "location") {
            searchParams.fields.forEach((field) => {
              acc[cur.date][field] = cur[field];
            });
          } else {
            searchParams.locations.forEach((location) => {
              if (cur.iso_code === location) {
                acc[cur.date][location] = cur[searchParams.fields[0]];
              }
            });
          }
          return acc;
        }, {})
      ),
    [data]
  );
  const dataKeys =
    searchParams.baseLine === "location"
      ? searchParams.fields
      : searchParams.locations;
  return (
    <div>
      {loading && <LoadingFullScreen />}
      <ResponsiveContainer width="99%" height={500}>
        <LineChart
          width={900}
          height={600}
          data={tranformedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={formatToThousandsMillions} />
          <Tooltip
            // @ts-ignore
            formatter={(value: number) => formatToThousandsMillions(value)}
          />
          <Legend />
          {dataKeys.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[i % colors.length]}
              activeDot={{ r: 8 }}
              dot={false}
              name={
                searchParams.baseLine === "location"
                  ? fieldOptions.find((f) => f.value === key)?.name
                  : locationOptions.find((l) => l.iso_code === key)?.location
              }
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const Chart = React.memo(ChartX, (prev, next) => isEqual(prev, next));

export { Chart };
