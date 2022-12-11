import React from "react";

import classes from "./PlayerData.module.css";

const PlayerData = (props) => {
  console.log(props.date);
  return (
    <li className={classes.data}>
      <h3>
        {props.date} @{props.playerName} #{props.playerScore}
      </h3>
    </li>
  );
};

export default PlayerData;
