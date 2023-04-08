"use client";

import { FormikErrors, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "reactstrap";
import { FormikInput } from "~/common/components/FormikInput";
import { useFetch } from "~/common/hooks/useFetch";

export default function LoginPage() {
  const [submit, submitting] = useFetch();

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    onSubmit: async (values) => {
      submit("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        feedback: {
          basedOn: "outcome",
          map: {
            success: {
              message: "Sign up successful",
              intent: "success",
            },
          },
        },
      })
        .then((res) => res.status === 201 && router.push("/user/login"))
        .catch((err) => console.error(err));
    },
    validate: (values) => {
      const errors: FormikErrors<typeof values> = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      if (values.password !== values.password2) {
        errors.password2 = "Passwords must match";
      }
      return errors;
    },
  });

  return (
    <div>
      <h1>Sign Up</h1>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <FormikInput name="name" label="Name" />
          <FormikInput name="email" label="Email" />
          <FormikInput name="password" label="Password" type="password" />
          <FormikInput
            name="password2"
            label="Confirm Password"
            type="password"
          />
          <Button color="primary" type="submit" disabled={submitting}>
            Submit <Spinner size="sm" color="light" hidden={!submitting} />
          </Button>
        </form>
      </FormikProvider>
    </div>
  );
}
