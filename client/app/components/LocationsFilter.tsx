import { FieldArray } from "formik";
import { Button, Col, Row } from "reactstrap";
import { FormikInput } from "~/common/components/FormikInput";

export type LocationOption = {
  continent: string;
  location: string;
  iso_code: string;
  isContinent: boolean;
  isIncomeGroup: boolean;
};

type Props = {
  locationOptions: LocationOption[];
  comparison?: boolean;
};

export function LocationsFilter({ locationOptions, comparison }: Props) {
  return (
    <FieldArray name="locations">
      {(arrayHelpers) => (
        <>
          {arrayHelpers.form.values.locations.map((_: any, index: number) => (
            <Col key={index} sm={12} md={4} lg={3}>
              <FormikInput
                name={`locations[${index}]`}
                label="Location"
                type="select"
              >
                <OptionGroup
                  label="Continents"
                  locationOptions={locationOptions.filter((l) => l.isContinent)}
                />
                <OptionGroup
                  label="Income Groups"
                  locationOptions={locationOptions.filter(
                    (l) => l.isIncomeGroup
                  )}
                />
                <OptionGroup
                  label="Countries"
                  locationOptions={locationOptions.filter(
                    (l) => !l.isContinent && !l.isIncomeGroup
                  )}
                />
              </FormikInput>
            </Col>
          ))}
          {!comparison && (
            <Col sm={12} md={4} lg={3} className="mb-3">
              <Button onClick={() => arrayHelpers.push("CAN")}>
                <i className="bi bi-plus-circle"></i>
              </Button>{" "}
              <Button
                onClick={() =>
                  arrayHelpers.remove(
                    arrayHelpers.form.values.locations.length - 1
                  )
                }
                disabled={arrayHelpers.form.values.locations.length === 1}
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

type OptionGroupProps = {
  locationOptions: LocationOption[];
  label: string;
};

function OptionGroup({ label, locationOptions }: OptionGroupProps) {
  return (
    <optgroup label={label}>
      {locationOptions.map((location) => (
        <option key={location.iso_code} value={location.iso_code}>
          {location.location}
        </option>
      ))}
    </optgroup>
  );
}
