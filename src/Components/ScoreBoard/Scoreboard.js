import { useEffect, useState } from "react";
import { backend_Url } from "../../App";
import PlayerData from "../PlayerData/PlayerData";

const ScoreBoard = (props) => {
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    const fetchDataHandler = () => {
      fetch(`${backend_Url}/score/allscore`)
        .then((response) => response.json())
        .then((data) => {
          const scores = data.scores;
          // console.log(scores);
          let dataArray = [];
          for (let i = 0; i < scores.length; i++) {
            dataArray.push({
              playerName: scores[i].player,
              playerScore: scores[i].score,
              date: new Date(scores[i].createdAt).toLocaleString(),
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
