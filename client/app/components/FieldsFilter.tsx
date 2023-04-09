import { FieldArray, useFormikContext } from "formik";
import { useEffect } from "react";
import { Button, Col, Row } from "reactstrap";
import { FormikInput } from "~/common/components/FormikInput";

export type FieldOption = {
  name: string;
  value: string;
};

type Props = {
  fieldOptions: FieldOption[];
  comparison?: boolean;
};

export function FieldsFilter({ fieldOptions, comparison }: Props) {
  return (
    <FieldArray name="fields">
      {(arrayHelpers) => (
        <>
          {arrayHelpers.form.values.fields.map((_: any, index: number) => (
            <Col key={index} sm={12} md={4} lg={3}>
              <FormikInput
                name={`fields[${index}]`}
                label="Field"
                type="select"
              >
                {fieldOptions.map((field) => (
                  <option key={field.value} value={field.value}>
                    {field.name}
                  </option>
                ))}
              </FormikInput>
            </Col>
          ))}
          {!comparison && (
            <Col sm={12} md={4} lg={3} className="mb-3">
              <Button onClick={() => arrayHelpers.push("total_cases")}>
                <i className="bi bi-plus-circle"></i>
              </Button>{" "}
              <Button
                onClick={() =>
                  arrayHelpers.remove(
                    arrayHelpers.form.values.fields.length - 1
                  )
                }
                disabled={arrayHelpers.form.values.fields.length === 1}
              >
                <i className="bi bi-dash-circle"></i>
              </Button>
            </Col>
          )}
        </>
      )}
    </FieldArray>
  );
}
