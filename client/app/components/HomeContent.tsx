"use client";

import { FormikProvider, useFormik } from "formik";
import { useDeferredValue, useEffect } from "react";
import { Chart } from "./Chart";
import { FieldOption } from "./FieldsFilter";
import { Filters } from "./Filters";
import { LocationOption } from "./LocationsFilter";

type Props = {
  fieldOptions: FieldOption[];
  locationOptions: LocationOption[];
  user: any;
};

export type SearchParams = {
  baseLine: "location" | "field";
  fields: string[];
  locations: string[];
  from?: string;
  to?: string;
};

const sanitizeSavedFilter = (savedFiltersString: string) => {
  let savedFilters;
  try {
    savedFilters = JSON.parse(savedFiltersString);
  } catch (e) {
    console.error(e);
    return;
  }
  if (
    !savedFilters ||
    ["location", "field"].indexOf(savedFilters.baseLine) === -1 ||
    !Array.isArray(savedFilters.fields) ||
    !Array.isArray(savedFilters.locations) ||
    (savedFilters.from && isNaN(Date.parse(savedFilters.from))) ||
    (savedFilters.to && isNaN(Date.parse(savedFilters.to)))
  ) {
    return;
  }
  return savedFilters;
};

export function HomeContent({ fieldOptions, locationOptions, user }: Props) {
  const getInitialValues = () => {
    return (
      sanitizeSavedFilter(user?.savedFilters) ?? {
        baseLine: "location",
        fields: ["new_cases_smoothed_per_million", "new_deaths_smoothed"],
        locations: ["CAN"],
      }
    );
  };

  const formik = useFormik<SearchParams>({
    initialValues: getInitialValues(),
    onSubmit: () => {},
  });

  useEffect(() => {
    formik.setValues(getInitialValues());
  }, [user]);

  useEffect(() => {
    if (formik.values.baseLine === "location") {
      formik.setFieldValue("locations", formik.values.locations.slice(0, 1));
    } else {
      formik.setFieldValue("fields", formik.values.fields.slice(0, 1));
    }
  }, [formik.values.baseLine]);

  const deferredFormValues = useDeferredValue(formik.values);

  return (
    <>
      <FormikProvider value={formik}>
        <Filters
          fieldOptions={fieldOptions}
          locationOptions={locationOptions}
          user={user}
        />
      </FormikProvider>
      <Chart
        searchParams={deferredFormValues}
        fieldOptions={fieldOptions}
        locationOptions={locationOptions}
      />
    </>
  );
}
