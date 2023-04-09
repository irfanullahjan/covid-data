"use client";

import { FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { LoadingFullScreen } from "~/common/components/LoadingFullScreen";
import { useFetch } from "~/common/hooks/useFetch";
import { Chart } from "./Chart";
import { FieldType } from "./FieldsFilter";
import { Filters } from "./Filters";

type Props = {
  fields: FieldType[];
  countries: string[];
  continents: string[];
};

export function HomeContent({ fields, countries, continents }: Props) {
  const [data, setData] = useState<any[] | null>();
  const [fetcher, loading] = useFetch();

  const formik = useFormik<{
    baseLine: "region" | "field";
    fields: string[];
    regions: {
      name: string;
      type: string;
    }[];
  }>({
    initialValues: {
      baseLine: "region",
      fields: ["total_cases", "total_deaths"],
      regions: [
        {
          name: "Pakistan",
          type: "location",
        },
      ],
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    setData(null);
  }, [formik.values.baseLine]);

  useEffect(() => {
    let url = "/covid-log/time-series/single-region?";
    if (formik.values.baseLine === "region") {
      const currentRegion = formik.values.regions[0];
      url += `regionType=${currentRegion.type}&region=${currentRegion.name}`;
      url += `&fields=${formik.values.fields.join(",")}`;
    } else {
      const currentRegion = formik.values.regions[0];
      url += `regionType=${currentRegion.type}&region=${currentRegion.name}`;
      url += `&fields=${formik.values.fields.join(",")}`;
    }
    fetcher(url)
      .then((res) => res.json())
      .then(setData);
  }, [formik.values]);

  return (
    <Container>
      <Row>
        <Col>
          {loading && <LoadingFullScreen />}
          <FormikProvider value={formik}>
            <Filters
              baseLine={formik.values.baseLine}
              fields={fields}
              countries={countries}
              continents={continents}
            />
          </FormikProvider>
          <Chart
            dataKeys={
              formik.values.baseLine === "region"
                ? formik.values.fields
                : formik.values.regions.map((region) => region.name)
            }
            data={data}
          />
        </Col>
      </Row>
    </Container>
  );
}
