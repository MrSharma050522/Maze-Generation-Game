import { useContext } from "react";
import { NavLink } from "react-router-dom";
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
            <NavLink to="/">
              <h3>Home</h3>
            </NavLink>
          </li>
          <li>
            <NavLink to="/scoreboard">
              <h3>Score-Board</h3>
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink to="/auth">
                <h3>Auth</h3>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to={isLoggedIn ? "/profile" : "/auth"}>
              <h3>Start Game</h3>
            </NavLink>
          </li>

          {isLoggedIn && (
            <li>
              <NavLink onClick={logoutHandler}>
                <h3>Logout</h3>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
