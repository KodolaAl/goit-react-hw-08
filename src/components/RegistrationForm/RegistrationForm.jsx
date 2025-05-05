import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";
import { useState } from "react";
import { Formik, Form, Field } from "formik";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, actions) => {
    setError("");

    const name = values.name.trim();
    const email = values.email.trim();
    const password = values.password.trim();

    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    try {
      setIsLoading(true);
      await dispatch(register({ name, email, password })).unwrap();
      actions.resetForm();
    } catch (err) {
      if (err?.code === 11000 || err?.message?.includes("email")) {
        setError("Email is already registered");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Username
          <Field className={css.field} type="text" name="name" required />
        </label>
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
          {isLoading ? "Registering..." : "Register"}
        </button>
        {error && <p className={css.error}>{error}</p>}
      </Form>
    </Formik>
  );
};
export default RegistrationForm;
