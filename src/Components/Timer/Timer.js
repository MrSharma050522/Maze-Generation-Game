import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Store/Data-Context";
import Control from "../Controls/Control";
import classes from "./Timer.module.css";

let timer;
let min = "--",
  second = "--";
let count = 0;
let first = true;

const Timer = (props) => {
  const [time, setTime] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const {
    gameFinished,
    setDisplayModal,
    setModalText,
    scoreHandler,
    displayModal,
    setStartPlaying,
  } = useContext(DataContext);

  useEffect(() => {
    if (time <= 0) {
      setTime(null);
      clearInterval(timer);
    }
    min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    second = String(time % 60).padStart(2, 0);

    if (time <= 0 && count === 0 && !gameFinished) {
      count++;
      clearInterval(timer);
      setTime(null);
      setDisplayModal("block");

      setModalText({
        firstText: " OOPS! Time's Up ",
        secondText: " Give Another Try!",
      });
      return;
    }
    if (gameFinished && displayModal !== "none" && time > 0) {
      clearInterval(timer);
      if (first) {
        scoreHandler(time);
        first = false;
      }
      console.log("Here again");
      setStartPlaying(false);
      setIsPaused(true);
      setTime((time) => time);
      return;
    }
    if (isPaused) {
      setTime((time) => time);
      return;
    } else {
      timer = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [
    time,
    displayModal,
    scoreHandler,
    setDisplayModal,
    setModalText,
    gameFinished,
    isPaused,
    setStartPlaying,
  ]);

  const gamePauseHandler = () => {
    setIsPaused(true);
  };

  const gameStartHandler = () => {
    if (!gameFinished) {
      setIsPaused(false);
    }
  };

  return (
    <div className={classes.timer}>
      {!gameFinished && <h2> Remaining Time ! : {`${min}:${second}`}</h2>}
      {gameFinished && <h2>Current Score : {time}</h2>}
      <Control start={gameStartHandler} pause={gamePauseHandler} />
    </div>
  );
};

export default Timer;
