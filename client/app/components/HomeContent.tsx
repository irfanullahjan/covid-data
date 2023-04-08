"use client";

import { FormikProvider, useFormik } from "formik";
import { Col, Container, Row } from "reactstrap";
import { Chart } from "./Chart";
import { FieldType } from "./FieldsFilter";
import { Filters } from "./Filters";

type Props = {
  fields: FieldType[];
};

export function HomeContent({ fields }: Props) {
  const formik = useFormik<{
    baseLine: "region" | "field";
    fields: string[];
    regions: string[];
  }>({
    initialValues: {
      baseLine: "region",
      fields: ["total_cases", "total_deaths"],
      regions: ["Europe"],
    },
    onSubmit: () => {},
  });
  return (
    <Container>
      <Row>
        <Col>
          <FormikProvider value={formik}>
            <Filters baseLine={formik.values.baseLine} fields={fields} />
          </FormikProvider>
          <Chart
            region={formik.values.regions[0]}
            field={formik.values.fields[0]}
          />
        </Col>
      </Row>
    </Container>
  );
}
