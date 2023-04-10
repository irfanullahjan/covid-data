"use client";

import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "reactstrap";
import { FormikInput } from "~/common/components/FormikInput";
import { useFetch } from "~/common/hooks/useFetch";

export function LoginForm() {
  const [submit, submitting] = useFetch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      submit("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        feedback: {
          basedOn: "status",
          map: {
            200: {
              message: "Login successful",
              intent: "success",
            },
          },
        },
      })
        .then((res) => {
          if (res.ok) {
            router.push("/");
            router.refresh();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });

  return (
    <div>
      <h1>Login</h1>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <FormikInput name="email" label="Email" />
          <FormikInput name="password" label="Password" type="password" />
          <Button color="primary" type="submit" disabled={submitting}>
            Submit <Spinner size="sm" color="light" hidden={!submitting} />
          </Button>
        </form>
      </FormikProvider>
    </div>
  );
}
