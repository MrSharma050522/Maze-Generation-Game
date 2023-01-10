import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend_Url } from "../../App";
import { DataContext } from "../../Store/Data-Context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { login, setName } = useContext(DataContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const swithcAuthModeHandler = (event) => {
    event.preventDefault();
    setIsLogin((prevState) => !prevState);
  };
  const submitFormHandler = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = `${backend_Url}/user/login`;
    } else {
      url = `${backend_Url}/user/register`;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.status === "success") {
          const name = data.user.email.split("@")[0];
          setName(name.split("")[0].toUpperCase() + name.substr(1));
          login();
          setIsLoading(false);
          // console.log(isLoggedIn);
          navigate("/profile");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    // console.log(enteredEmail, enteredPassword);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request . . .</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={swithcAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
