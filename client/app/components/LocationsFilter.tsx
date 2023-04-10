import { FieldArray } from "formik";
import { useTransition } from "react";
import { Button, Col } from "reactstrap";
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
  const [isPending, startTransition] = useTransition();
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
                style={{ backgroundColor: "blanchedalmond" }}
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
                    arrayHelpers.push("CAN");
                  })
                }
              >
                Add
              </Button>{" "}
              <Button
                color="danger"
                disabled={
                  arrayHelpers.form.values.locations.length === 1 || isPending
                }
                onClick={() =>
                  startTransition(() =>
                    arrayHelpers.remove(
                      arrayHelpers.form.values.locations.length - 1
                    )
                  )
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
