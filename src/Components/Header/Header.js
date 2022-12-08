import { useContext } from "react";
import { NavLink, Route } from "react-router-dom";
import { DataContext } from "../../Store/Data-Context";
import classes from "./Header.module.css";

const Header = (props) => {
  const { title, isLoggedIn, logout } = useContext(DataContext);
  const logoutHandler = (event) => {
    logout();
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink to="/auth">Auth</NavLink>
            </li>
          )}

          <li>
            <NavLink to={isLoggedIn ? "/profile" : "/auth"}>Profile</NavLink>
          </li>

          {isLoggedIn && (
            <li>
              <NavLink onClick={logoutHandler}>Logout</NavLink>
            </li>
          )}
        </ul>
      </nav>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
