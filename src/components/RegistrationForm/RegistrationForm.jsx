import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";
import { useState } from "react";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value.trim();

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
      form.reset();
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
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Username
        <input type="text" name="name" required />
      </label>
      <label className={css.label}>
        Email
        <input type="email" name="email" required />
      </label>
      <label className={css.label}>
        Password
        <input type="password" name="password" required />
      </label>
      <button className={css.button} type="submit" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
      {error && <p className={css.error}>{error}</p>}
    </form>
  );
};
export default RegistrationForm;

// const dispatch = useDispatch();

// const handleSubmit = (e) => {
//   e.preventDefault();
//   const form = e.target;

//   const name = form.elements.name.value.trim();
//   const email = form.elements.email.value.trim();
//   const password = form.elements.password.value.trim();

//   if (!name || !email || !password) {
//     alert("All fields are required!");
//     return;
//   }

//   dispatch(
//     register({
//       name,
//       email,
//       password,
//     })
//   );

//   form.reset();
// };
