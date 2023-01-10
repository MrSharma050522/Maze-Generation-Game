import { useCallback, useContext, useEffect, useState } from "react";
import { DataContext } from "../../Store/Data-Context";
import Control from "../Controls/Control";
import classes from "./Timer.module.css";

let timer;
let min = "--",
  second = "--";
let count = 0;

const Timer = (props) => {
  const [time, setTime] = useState(props.value);
  const {
    gameFinished,
    setDisplayModal,
    setModalText,
    scoreHandler,
    displayModal,
  } = useContext(DataContext);

  const tick = useCallback(() => {
    // console.log(gameFinished);

    if (time < 1) {
      setTime(null);
      clearInterval(timer);
    }
    min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    second = String(time % 60).padStart(2, 0);

    if (time < 1 && count === 0) {
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
    if (gameFinished && displayModal !== "none") {
      clearInterval(timer);
      scoreHandler(time);
      console.log("Here again");
      setTime((time) => time);
      return;
    }
    // console.log("inside", timer, time);
    setTime((time) => time - 1);
    // console.log(time);
  }, [gameFinished, setDisplayModal, setModalText, time, scoreHandler]);

  useEffect(() => {
    if (timer) {
      clearInterval(timer);
    }
    // console.log("useeffec", timer, time);
    timer = setInterval(tick, 1000);
  }, [tick]);

  const gamePauseHandler = () => {
    if (time) {
      clearInterval(timer);
      setTime(time);
    }
  };

  const gameStartHandler = () => {
    if (time) {
      timer = setInterval(tick, time);
      setTime(time);
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
