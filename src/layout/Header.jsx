import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="w-50 mx-auto nav d-flex justify-content-between py-5">
        <NavLink to="/" className={({ isActive }) => (isActive ? "text-muted" : "")}>
          Home
        </NavLink>
        <NavLink to="todos" className={({ isActive }) => (isActive ? "text-muted" : "")}>
          Todos
        </NavLink>
        {/* consider turning these into modals */}
        <NavLink to="sign-up" className={({ isActive }) => (isActive ? "text-muted" : "")}>
          Sign Up
        </NavLink>
        <NavLink to="log-out" className={({ isActive }) => (isActive ? "text-muted" : "")}>
          Log Out
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
