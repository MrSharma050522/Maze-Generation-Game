import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../Store/Data-Context";
import classes from "./Home.module.css";

const Home = () => {
  const { name } = useContext(DataContext);

  return (
    <Fragment>
      <div className={classes.header}>
        <h1>!! {name ? name : "Guest"} !!</h1>
        <h2>Welcome to Maze Generator Game </h2>
        <h3>Here you can generate you own maze </h3>
        <h4>Play at your conditions</h4>
        <p>Have fun! </p>
      </div>
      <footer className={classes.footer}>
        <nav>
          <ul>
            <li>
              Click here to :
              <Link to="/auth">
                <u> Log In</u>
              </Link>
            </li>
            <li>
              Click here to :
              <Link to="/profile">
                <u>Start!</u>
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </Fragment>
  );
};

export default Home;
