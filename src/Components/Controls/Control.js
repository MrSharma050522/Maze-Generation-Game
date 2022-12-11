import { useContext, useState } from "react";
import { DataContext } from "../../Store/Data-Context";
import classes from "./Control.module.css";

const Control = (props) => {
  const [isPaused, setIsPaused] = useState(false);
  const { startPlaying, setStartPlaying } = useContext(DataContext);

  const startMazeGeneration = (event) => {
    event.preventDefault();
    window.location.reload();
  };

  const startPlayingHandler = (event) => {
    event.preventDefault();
    // console.log(startPlaying);
    setStartPlaying(true);
    // console.log(startPlaying);
  };

  const pauseGameHandler = (event) => {
    event.preventDefault();
    if (isPaused) {
      props.start();
      setStartPlaying(true);
      setIsPaused(false);
    } else {
      props.pause();
      setStartPlaying(false);
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
        onClick={pauseGameHandler}
      >
        {isPaused ? "Resume" : "Pause"}
      </button>
    </div>
  );
};

export default Control;
