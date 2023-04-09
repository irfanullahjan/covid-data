import { FieldArray } from "formik";
import { Col, Row } from "reactstrap";
import { FormikInput } from "~/common/components/FormikInput";

export type FieldType = {
  name: string;
  value: string;
};

type Props = {
  fields: FieldType[];
  comparison?: boolean;
};

export function FieldsFilter({ fields, comparison }: Props) {
  const fieldInputs = comparison ? Array.from({ length: 2 }) : [null];

  return (
    <Row>
      <FieldArray name="fields">
        {(arrayHelpers) => (
          <>
            {arrayHelpers.form.values.fields.map((_: any, index: number) => (
              <Col key={index}>
                <FormikInput
                  name={`fields[${index}]`}
                  label="Field Name"
                  type="select"
                >
                  {fields.map((field) => (
                    <option key={field.value} value={field.value}>
                      {field.name}
                    </option>
                  ))}
                </FormikInput>
              </Col>
            ))}
          </>
        )}
      </FieldArray>
    </Row>
  );
}
