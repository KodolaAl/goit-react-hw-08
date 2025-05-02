import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
import clsx from "clsx";
export const AuthNav = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div className={css.login}>
      <NavLink to="/register" className={buildLinkClass}>
        Register
      </NavLink>
      <NavLink to="/login" className={buildLinkClass}>
        Log In
      </NavLink>
    </div>
  );
};
