import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import { useState } from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value.trim();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Dispatching logIn with:", { email, password });
      await dispatch(logIn({ email, password })).unwrap();
    } catch (error) {
      console.log("Login error:", error);

      if (error?.status === 400) {
        setError("Incorrect email or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Email
        <input type="email" name="email" required />
      </label>
      <label className={css.label}>
        Password
        <input type="password" name="password" required />
      </label>
      <button className={css.button} type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log In"}
      </button>
      {error && <p className={css.error}>{error}</p>}
    </form>
  );
};
export default LoginForm;
