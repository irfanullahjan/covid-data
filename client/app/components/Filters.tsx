"use client";

import { FormikInput } from "~/common/components/FormikInput";
import { FieldType, FieldsFilter } from "./FieldsFilter";
import { RegionsFilter } from "./RegionsFilter";

type Props = {
  baseLine?: "region" | "field";
  fields: FieldType[];
};

export function Filters({ baseLine = "region", fields }: Props) {
  return (
    <>
      <FormikInput name="baseLine" label="Base Line" type="select">
        <option value="region">Region</option>
        <option value="field">Field</option>
      </FormikInput>
      {baseLine === "region" ? (
        <>
          <FieldsFilter fields={fields} />
          <RegionsFilter regions={[]} comparison />
        </>
      ) : (
        <>
          <RegionsFilter regions={[]} />
          <FieldsFilter fields={fields} comparison />
        </>
      )}
    </>
  );
}
