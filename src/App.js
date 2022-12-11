import { Fragment, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Display from "./Components/Display/Display";

import Header from "./Components/Header/Header";
import ScoreBoard from "./Components/ScoreBoard/Scoreboard";
import AuthPage from "./Pages/AuthFormPage";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import { DataContext } from "./Store/Data-Context";

function App() {
  const { isLoggedIn } = useContext(DataContext);

  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        {isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
        <Route path="/scoreboard" element={<ScoreBoard />} />
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
