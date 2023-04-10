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
        <Col sm={12} md={4} lg={3}>
          <FormikInput
            name="from"
            label="From"
            type="date"
            style={{ backgroundColor: "lightgray" }}
          />
        </Col>
        <Col sm={12} md={4} lg={3}>
          <FormikInput
            name="to"
            label="To"
            type="date"
            style={{ backgroundColor: "lightgray" }}
          />
        </Col>
        <Col sm={12} md={4} lg={3}>
          <FormikInput
            name="baseLine"
            label="Baseline"
            type="select"
            style={
              baseLine === "location"
                ? { backgroundColor: "blanchedalmond" }
                : { backgroundColor: "powderblue" }
            }
          >
            <option value="location">Location</option>
            <option value="field">Field</option>
          </FormikInput>
        </Col>
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
