"use client";

import { useField, useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Row, Spinner } from "reactstrap";
import { FormikInput } from "~/common/components/FormikInput";
import { useFetch } from "~/common/hooks/useFetch";
import { FieldOption, FieldsFilter } from "./FieldsFilter";
import { LocationOption, LocationsFilter } from "./LocationsFilter";

type Props = {
  fieldOptions: FieldOption[];
  locationOptions: LocationOption[];
  user: any;
};

export function Filters({ fieldOptions, locationOptions, user }: Props) {
  const [saveFilters, saving] = useFetch();
  const [deleteFilters, deleting] = useFetch();
  const formik = useFormikContext<{ remember: boolean }>();
  const router = useRouter();
  const [{ value: baseLine }] = useField("baseLine");
  return (
    <>
      <Row>
        <Col sm={12} md={4} lg={3}>
          <FormikInput
            name="from"
            label="From"
            type="date"
            style={{ backgroundColor: "lightgray" }}
          />
        </Col>
        <Col sm={12} md={4} lg={3}>
          <FormikInput
            name="to"
            label="To"
            type="date"
            style={{ backgroundColor: "lightgray" }}
          />
        </Col>
        <Col sm={12} md={4} lg={3}>
          <FormikInput
            name="baseLine"
            label="Baseline"
            type="select"
            style={
              baseLine === "location"
                ? { backgroundColor: "blanchedalmond" }
                : { backgroundColor: "powderblue" }
            }
          >
            <option value="location">Location</option>
            <option value="field">Field</option>
          </FormikInput>
        </Col>
        {baseLine === "location" ? (
          <>
            <LocationsFilter locationOptions={locationOptions} comparison />
            <FieldsFilter fieldOptions={fieldOptions} />
          </>
        ) : (
          <>
            <FieldsFilter fieldOptions={fieldOptions} comparison />
            <LocationsFilter locationOptions={locationOptions} />
          </>
        )}
        {user && (
          <Col
            sm={12}
            md={4}
            lg={3}
            className="mb-3 d-flex align-items-center gap-3"
          >
            <Button
              color="primary"
              type="submit"
              onClick={() =>
                saveFilters(`/user/${user.id}`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    savedFilters: JSON.stringify(formik.values),
                  }),
                })
              }
            >
              Save Filter {saving && <Spinner size="sm" color="light" />}
            </Button>
            <Button
              color="danger"
              type="submit"
              onClick={() =>
                deleteFilters(`/user/${user.id}`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    savedFilters: JSON.stringify({}),
                  }),
                }).then(() => {
                  router.refresh();
                })
              }
            >
              Reset {deleting && <Spinner size="sm" color="light" />}
            </Button>
          </Col>
        )}
      </Row>
    </>
  );
}
