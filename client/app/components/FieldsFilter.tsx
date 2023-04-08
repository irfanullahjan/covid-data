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
      {fieldInputs.map((_, i) => (
        <Col key={i}>
          <FormikInput name={`fields[${i}]`} label="Fields" type="select">
            {fields.map((field) => (
              <option key={field.value} value={field.value}>
                {field.name}
              </option>
            ))}
          </FormikInput>
        </Col>
      ))}
    </Row>
  );
}
