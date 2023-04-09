"use client";

import { Col, Row } from "reactstrap";
import { FormikInput } from "~/common/components/FormikInput";
import { FieldOption, FieldsFilter } from "./FieldsFilter";
import { LocationOption, LocationsFilter } from "./LocationsFilter";

type Props = {
  baseLine?: "location" | "field";
  fieldOptions: FieldOption[];
  locationOptions: LocationOption[];
};

export function Filters({
  baseLine = "location",
  fieldOptions,
  locationOptions,
}: Props) {
  return (
    <>
      <Row>
        <Col>
          <FormikInput name="baseLine" label="Baseline" type="select">
            <option value="location">Location</option>
            <option value="field">Field</option>
          </FormikInput>
        </Col>
        <Col>
          <FormikInput name="from" label="From" type="date" />
        </Col>
        <Col>
          <FormikInput name="to" label="To" type="date" />
        </Col>
      </Row>
      <Row>
        {baseLine === "location" ? (
          <>
            <LocationsFilter locationOptions={locationOptions} comparison />
            <FieldsFilter fieldOptions={fieldOptions} />
          </>
        ) : (
          <>
            <FieldsFilter fieldOptions={fieldOptions} comparison />
            <LocationsFilter locationOptions={locationOptions} />
          </>
        )}
      </Row>
    </>
  );
}
