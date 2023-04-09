import { FieldArray } from "formik";
import { Col, Row } from "reactstrap";
import { FormikInput } from "~/common/components/FormikInput";

type Props = {
  countries: string[];
  continents: string[];
  comparison?: boolean;
};

export function RegionsFilter({ continents, countries, comparison }: Props) {
  return (
    <Row>
      <FieldArray name="regions">
        {(arrayHelpers) => (
          <>
            {arrayHelpers.form.values.regions.map((_: any, index: number) => (
              <Col key={index}>
                <FormikInput
                  name={`regions[${index}].type`}
                  label="Region Type"
                  type="select"
                >
                  <option value="location">Location</option>
                  <option value="continent">Continent</option>
                </FormikInput>
                <FormikInput
                  name={`regions[${index}].name`}
                  label="Region Name"
                  type="select"
                >
                  {arrayHelpers.form.values.regions[index].type === "location"
                    ? countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))
                    : continents.map((continent) => (
                        <option key={continent} value={continent}>
                          {continent}
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
