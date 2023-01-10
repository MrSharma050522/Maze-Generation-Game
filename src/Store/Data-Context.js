import { createContext, useState } from "react";
import { backend_Url } from "../App";

export const DataContext = createContext({
  size: 0,
  row: 0,
  name: "",
  title: "",
  gameStart: false,
  startPlaying: false,
});

export const DataProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("Create Your Own Maze Puzzle");
  const [size, setSize] = useState(500);
  const [row, setRow] = useState(10);
  const [gameFinished, setGameFinished] = useState(false);
  const [startPlaying, setStartPlaying] = useState(false);
  const [displayModal, setDisplayModal] = useState("none");
  const [modalText, setModalText] = useState({
    firstText: "",
    secondText: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  const logoutHandler = () => {
    setIsLoggedIn(null);
    // console.log(isLoggedIn);
    setName(" . . . ");
    localStorage.removeItem("isLoggedIn");
  };

  const loginHandler = () => {
    setIsLoggedIn(true);
    // console.log(isLoggedIn);
    localStorage.setItem("isLoggedIn", isLoggedIn);
  };

  function scoreHandler(score) {
    fetch(`${backend_Url}/score/addscore`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: name,
        score: score,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("Here again at soter");
      })
      .catch((err) => console.log(err.message));
  }

  const value = {
    size,
    setSize,
    row,
    setRow,
    name,
    setName,
    title,
    setTitle,
    gameFinished,
    setGameFinished,
    startPlaying,
    setStartPlaying,
    displayModal,
    setDisplayModal,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    modalText,
    setModalText,
    scoreHandler,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
