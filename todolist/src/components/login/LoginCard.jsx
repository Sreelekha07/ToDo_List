import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// recoil js
import { useRecoilState } from "recoil";
import userInfoAtom from "../../recoil/userInfoAtom";

const LoginCard = () => {
  // global variables
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);  
  // variables
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userInfo data: ", userInfo)
  },[userInfo])

  // functions
  const onSubmit = async(e) => {
    //  does not allow page to refresh
    e.preventDefault();

    const userCredentials = {
      username: usernameRef?.current?.value,
      password: passwordRef?.current?.value,
    };
    fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data?.message === "Successfully Logined") {
          console.log("1");
          localStorage.setItem("userStatus", "true");
          setUserInfo(true); // Update the userInfo atom
          setTimeout(() => {
            navigate("/"); // Redirect to the home page after a short delay
          }, 100); // 100ms delay
        } else {
          localStorage.setItem("userStatus", "false");
          console.log("2");
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div>
      <div className="login-card-container">
        <div>
          <h1 className="login-heading">TodoX</h1>
        </div>
        <form onSubmit={onSubmit}>
          <input
            className="login-inputs"
            type="text"
            placeholder="Username"
            ref={usernameRef}
            writingsuggestions="true"
          />
          <input
            className="login-inputs"
            type="password"
            placeholder="Password"
            ref={passwordRef}
            writingsuggestions="true"
          />

          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
