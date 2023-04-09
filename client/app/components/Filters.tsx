"use client";

import { FormikInput } from "~/common/components/FormikInput";
import { FieldType, FieldsFilter } from "./FieldsFilter";
import { RegionsFilter } from "./RegionsFilter";

type Props = {
  baseLine?: "region" | "field";
  fields: FieldType[];
  continents: string[];
  countries: string[];
};

export function Filters({
  baseLine = "region",
  fields,
  continents,
  countries,
}: Props) {
  return (
    <>
      <FormikInput name="baseLine" label="Base Line" type="select">
        <option value="region">Region</option>
        <option value="field">Field</option>
      </FormikInput>
      {baseLine === "region" ? (
        <>
          <RegionsFilter
            countries={countries}
            continents={continents}
            comparison
          />
          <FieldsFilter fields={fields} />
        </>
      ) : (
        <>
          <FieldsFilter fields={fields} comparison />
          <RegionsFilter countries={countries} continents={continents} />
        </>
      )}
    </>
  );
}
