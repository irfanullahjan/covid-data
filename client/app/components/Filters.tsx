"use client";

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
      <FormikInput name="baseLine" label="Baseline" type="select">
        <option value="location">Location</option>
        <option value="field">Field</option>
      </FormikInput>
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
    </>
  );
}
