import { createContext, useState } from "react";

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
    console.log(isLoggedIn);
    localStorage.setItem("isLoggedIn", isLoggedIn);
  };

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
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
