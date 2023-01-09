import { Fragment, useContext, useState } from "react";
import Celebration from "./Confetti";
import { DataContext } from "../../Store/Data-Context";
import Form from "../Form/Form";
import GenerateMaze from "../MazeGenerator";
import WinningModal from "../Modal/WinningModal";

const Display = () => {
  const { gameFinished } = useContext(DataContext);
  const [showMaze, setShowMaze] = useState(false);

  return (
    <Fragment>
      {!showMaze && <Form setShowMaze={setShowMaze} />}
      <WinningModal />
      {showMaze && <GenerateMaze />}

      {gameFinished && <Celebration />}
    </Fragment>
  );
};

export default Display;
