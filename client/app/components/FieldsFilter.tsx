import { FieldArray } from "formik";
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
    <Row>
      <FieldArray name="fields">
        {(arrayHelpers) => (
          <>
            {arrayHelpers.form.values.fields.map((_: any, index: number) => (
              <Col key={index}>
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
              <Col md={1} className="d-flex align-items-center">
                <Button onClick={() => arrayHelpers.push("total_cases")}>
                  <i className="bi bi-plus-circle"></i>
                </Button>
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
    </Row>
  );
}
