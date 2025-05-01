import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/contacts" className={buildLinkClass}>
          Contacts
        </NavLink>
        <div className={css.login}>
          <NavLink to="/register" className={buildLinkClass}>
            Register
          </NavLink>
          <NavLink to="/login" className={buildLinkClass}>
            Log In
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
