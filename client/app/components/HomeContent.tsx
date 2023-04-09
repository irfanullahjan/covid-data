"use client";

import { FormikProvider, useFormik } from "formik";
import _ from "lodash";
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
      fields: ["new_cases"],
      locations: ["PAK"],
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    setData(null);
  }, [formik.values.baseLine]);

  useEffect(() => {
    if (formik.values.baseLine === "location") {
      formik.setFieldValue("locations", formik.values.locations.slice(0, 1));
    } else {
      formik.setFieldValue("fields", formik.values.fields.slice(0, 1));
    }
  }, [formik.values.baseLine]);

  useEffect(() => {
    let url = "/covid-log/time-series?";
    if (formik.values.baseLine === "location") {
      const currentLocation = formik.values.locations[0];
      url += `locations=${currentLocation}`;
      url += `&fields=${formik.values.fields.join(",")}`;
    } else {
      const currentLocation = formik.values.locations[0];
      url += `locations=${currentLocation}`;
      url += `&fields=${formik.values.fields.join(",")}`;
    }
    fetcher(url)
      .then((res) => res.json())
      .then((json) => {
        if (formik.values.baseLine === "location") {
          const datesArr = _.uniq(json.map((d: any) => d.date));
          const transformedData = datesArr.map((date) => {
            const row: any = { date };
            json.forEach((d: any) => {
              if (d.date === date) {
                formik.values.fields.forEach((f) => {
                  row[f] = d[f];
                });
              }
            });
            return row;
          });
          setData(transformedData);
        }
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
