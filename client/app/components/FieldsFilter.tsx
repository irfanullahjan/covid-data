import { FieldArray } from "formik";
import { useTransition } from "react";
import { Button, Col } from "reactstrap";
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
  const [isPending, startTransition] = useTransition();
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
                style={{ backgroundColor: "powderblue" }}
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
            <Col
              sm={12}
              md={4}
              lg={3}
              className="mb-3 d-flex align-items-center gap-3"
            >
              <Button
                color="primary"
                disabled={isPending}
                onClick={() =>
                  startTransition(() => {
                    arrayHelpers.push("total_cases");
                  })
                }
              >
                Add
              </Button>
              <Button
                color="danger"
                disabled={
                  arrayHelpers.form.values.fields.length === 1 || isPending
                }
                onClick={() =>
                  startTransition(() => {
                    arrayHelpers.remove(
                      arrayHelpers.form.values.fields.length - 1
                    );
                  })
                }
              >
                Remove
              </Button>
            </Col>
          )}
        </>
      )}
    </FieldArray>
  );
}
