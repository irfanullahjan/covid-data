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
import { formatToThousandsMillions } from "~/common/utils/numberUtils";
import { FieldOption } from "./FieldsFilter";
import { LocationOption } from "./LocationsFilter";

type Props = {
  data: any;
  dataKeys: string[];
  fieldOptions: FieldOption[];
  locationOptions: LocationOption[];
  baseLine: "location" | "field";
};

export function Chart({
  data,
  dataKeys,
  fieldOptions,
  locationOptions,
  baseLine,
}: Props) {
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
                baseLine === "location"
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
