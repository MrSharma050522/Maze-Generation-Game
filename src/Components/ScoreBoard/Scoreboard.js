import { useEffect, useState } from "react";
import PlayerData from "../PlayerData/PlayerData";

const ScoreBoard = (props) => {
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    const fetchDataHandler = () => {
      const response = fetch(
        "https://maze-generator-project-default-rtdb.firebaseio.com/score-data.json"
      )
        .then((response) => response.json())
        .then((data) => {
          let dataArray = [];
          for (const key in data) {
            dataArray.push({
              playerName: data[key].player,
              playerScore: data[key].score,
              date: data[key].date,
            });
          }
          setDisplayData(dataArray);
        });

      // console.log(dataArray);
    };
    fetchDataHandler();
  }, []);

  return (
    <div>
      {displayData.map((item, index) => {
        return (
          <PlayerData
            key={index}
            playerName={item.playerName}
            playerScore={item.playerScore}
            date={item.date}
          />
        );
      })}
    </div>
  );
};

export default ScoreBoard;
