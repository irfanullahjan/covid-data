"use client";

import { FormikProvider, useFormik } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { LoadingFullScreen } from "~/common/components/LoadingFullScreen";
import { useFetch } from "~/common/hooks/useFetch";
import { formatParamArrayToString } from "~/common/utils/urlUtils";
import { Chart } from "./Chart";
import { FieldOption } from "./FieldsFilter";
import { Filters } from "./Filters";
import { LocationOption } from "./LocationsFilter";

type Props = {
  fieldOptions: FieldOption[];
  locationOptions: LocationOption[];
};

export function HomeContent({ fieldOptions, locationOptions }: Props) {
  const [data, setData] = useState([]);
  const [fetcher, loading] = useFetch();

  const formik = useFormik<{
    baseLine: "location" | "field";
    fields: string[];
    locations: string[];
    from?: string;
    to?: string;
  }>({
    initialValues: {
      baseLine: "location",
      fields: ["new_cases_smoothed_per_million", "new_deaths_smoothed"],
      locations: ["CAN"],
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    if (formik.values.baseLine === "location") {
      formik.setFieldValue("locations", formik.values.locations.slice(0, 1));
    } else {
      formik.setFieldValue("fields", formik.values.fields.slice(0, 1));
    }
  }, [formik.values.baseLine]);

  const urlRef = useRef("");

  useEffect(() => {
    const locations = formik.values.locations;
    const fields = formik.values.fields;
    let url = "/covid-log/time-series?";
    url += formatParamArrayToString("locations", locations);
    url += "&";
    url += formatParamArrayToString("fields", fields);
    if (formik.values.from) {
      url += `&from=${formik.values.from}`;
    }
    if (formik.values.to) {
      url += `&to=${formik.values.to}`;
    }
    if (urlRef.current === url) {
      return;
    }
    urlRef.current = url;
    fetcher(url)
      .then((res) => res.json())
      .then(setData);
  }, [formik.values]);

  const tranformedData = useMemo(
    () =>
      Object.values(
        data.reduce((acc: any, cur: any) => {
          if (!acc[cur.date]) {
            acc[cur.date] = {
              date: cur.date,
            };
          }
          if (formik.values.baseLine === "location") {
            formik.values.fields.forEach((field) => {
              acc[cur.date][field] = cur[field];
            });
          } else {
            formik.values.locations.forEach((location) => {
              if (cur.iso_code === location) {
                acc[cur.date][location] = cur[formik.values.fields[0]];
              }
            });
          }
          return acc;
        }, {})
      ),
    [data, formik.values]
  );

  return (
    <>
      {loading && <LoadingFullScreen />}
      <FormikProvider value={formik}>
        <Filters
          baseLine={formik.values.baseLine}
          fieldOptions={fieldOptions}
          locationOptions={locationOptions}
        />
      </FormikProvider>
      <Chart
        dataKeys={
          formik.values.baseLine === "location"
            ? formik.values.fields
            : formik.values.locations
        }
        data={tranformedData}
      />
    </>
  );
}
