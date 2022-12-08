import { Fragment, useContext, useEffect, useState } from "react";
import Celebration from "./Confetti";
import { DataContext } from "../../Store/Data-Context";
import Control from "../Controls/Control";
import Form from "../Form/Form";
import GenerateMaze from "../MazeGenerator";
import WinningModal from "../Modal/WinningModal";

const Display = () => {
  const { gameFinished, isLoggedIn } = useContext(DataContext);
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
