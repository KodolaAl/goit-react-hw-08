import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import { useState } from "react";
import { Formik, Form, Field } from "formik";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, actions) => {
    setError("");
    const email = values.email.trim();
    const password = values.password.trim();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(logIn({ email, password })).unwrap();
    } catch (error) {
      if (error?.status === 400) {
        setError("Incorrect email or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
      actions.resetForm();
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Email
          <Field className={css.field} type="email" name="email" required />
        </label>
        <label className={css.label}>
          Password
          <Field
            className={css.field}
            type="password"
            name="password"
            required
          />
        </label>
        <button className={css.button} type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
        {error && <p className={css.error}>{error}</p>}
      </Form>
    </Formik>
  );
};
export default LoginForm;
