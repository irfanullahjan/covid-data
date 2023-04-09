"use client";

import { FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { LoadingFullScreen } from "~/common/components/LoadingFullScreen";
import { useFetch } from "~/common/hooks/useFetch";
import { Chart } from "./Chart";
import { FieldOption } from "./FieldsFilter";
import { Filters } from "./Filters";
import { LocationOption } from "./LocationsFilter";

type Props = {
  fieldOptions: FieldOption[];
  locationOptions: LocationOption[];
};

export function HomeContent({ fieldOptions, locationOptions }: Props) {
  const [data, setData] = useState<any[] | null>();
  const [fetcher, loading] = useFetch();

  const formik = useFormik<{
    baseLine: "location" | "field";
    fields: string[];
    locations: string[];
  }>({
    initialValues: {
      baseLine: "location",
      fields: ["new_cases_smoothed_per_million", "new_deaths_smoothed"],
      locations: ["CAN"],
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    setData(null);
    if (formik.values.baseLine === "location") {
      formik.setFieldValue("locations", formik.values.locations.slice(0, 1));
    } else {
      formik.setFieldValue("fields", formik.values.fields.slice(0, 1));
    }
  }, [formik.values.baseLine]);

  useEffect(() => {
    const locations = formik.values.locations;
    let url = "/covid-log/time-series";
    url += `?locations=${locations.join(",")}`;
    url += `&fields=${formik.values.fields.join(",")}`;
    fetcher(url)
      .then((res) => res.json())
      .then((responseArray) => {
        const transformedData = responseArray.reduce((acc: any, cur: any) => {
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
        }, {});
        setData(Object.values(transformedData));
      });
  }, [formik.values]);

  return (
    <Container>
      <Row>
        <Col>
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
            data={data}
          />
        </Col>
      </Row>
    </Container>
  );
}
