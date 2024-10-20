import React, { useEffect } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import userInfoAtom from "../../recoil/userInfoAtom";
import addTaskAtom from "../../recoil/addTaskAtom";

const Header = (props) => {
  // global variables
  // const [setUserInfo] = useRecoilState(userInfoAtom);
  const [ userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(addTaskAtom);

  useEffect(() => {
    console.log(addTaskOverlay);
  },[addTaskOverlay]);

  const navigate = useNavigate();
  return (
    <header>
      <div className="home-header-container">
        <h1 className="header-logo-text">TodoX</h1>
        <div className="btn-container">
          <button
            className="new-class-btn"
            onClick={() => {
              if (addTaskOverlay) {
                setAddTaskOverlay(null);
              } else {
                setAddTaskOverlay(true);
              }
            }}
          >
            <span>
              <AddRoundedIcon />
            </span>{" "}
            Todo
          </button>
          <button
            className="new-class-btn"
            onClick={() => {
              navigate("/login");
              setUserInfo(false);
              localStorage?.clear();
            }}
          >
            <LogoutRoundedIcon fontSize="large" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
