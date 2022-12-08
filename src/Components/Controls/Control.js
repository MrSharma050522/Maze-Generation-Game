import { useContext, useState } from "react";
import { DataContext } from "../../Store/Data-Context";
import classes from "./Control.module.css";

const Control = (props) => {
  const [isPaused, setIsPaused] = useState(false);

  const startMazeGeneration = (event) => {
    event.preventDefault();
    window.location.reload();
  };
  const cancelPlaying = (event) => {
    event.preventDefault();
    if (isPaused) {
      props.start();
      setIsPaused(false);
    } else {
      props.pause();
      setIsPaused(true);
    }
  };

  return (
    <div className={classes.control}>
      <button
        className={`${classes.button} ${classes.button1}`}
        onClick={startMazeGeneration}
      >
        Restart
      </button>
      <button
        className={`${classes.button} ${classes.button2}`}
        onClick={cancelPlaying}
      >
        {isPaused ? "Resume" : "Pause"}
      </button>
    </div>
  );
};

export default Control;
