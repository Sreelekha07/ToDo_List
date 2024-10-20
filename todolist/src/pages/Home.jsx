import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Header from "../components/home/Header";
import SearchBar from "../components/home/SearchBar";
import Filters from "../components/home/Filters";
import Todos from "../components/home/Todos";
import AddTask from "../components/home/AddTask";
import addTaskAtom from "../recoil/addTaskAtom";
import "./home.css";
import apiDataAtom from "../recoil/apiDataAtom";
import todoData from "../recoil/todoData";
import EditTask from "../components/home/EditTask";
import editTaskAtom from "../recoil/editTaskAtom";
import filterDataAtom from "../recoil/filterDataAtom";

const Home = () => {
  const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(addTaskAtom);
  const [apiData, setApiData] = useRecoilState(apiDataAtom);
  const [todoApiData, setTodoApiData] = useRecoilState(todoData);
  const [selectedEditTask, setSelectedEditTask] = useRecoilState(editTaskAtom);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);

  const homeData = {
    stats: [
      { label: "All", value: 4 },
      { label: "Completed", value: 6 },
      { label: "inProgress", value: 2 },
      { label: "Archived", value: 10 },
    ],
    todo_data: [
      {
        title: "Supply Chain Presentation",
        desc: "Need to make a ppt on the topic challenges faced during demand forecasting and solutions of how to overcome them.",
        status: "completed",
      },
      {
        title: "Room Cleaning",
        desc: "Sweaping room, giving clothes to laundry, cleaning cupboard",
        status: "in progress",
      },
      {
        title: "Assignments",
        desc: "OR tutorial 7(submission-Tuesday) ; WSD tutorial 3(submission-Friday)",
        status: "archived",
      },
      {
        title: "Gym",
        desc: "dabakhe khana uthake phekna",
        status: "completed",
      },
    ],
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/initial_call", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setApiData(data);
        setTodoApiData(data?.todo_data);
        setFilterData(data?.stats);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  // initial call to get apiData

  return (
    <div className="relative">
      {addTaskOverlay && (
        <div>
          <div
            className="add-overlay"
            onClick={() => setAddTaskOverlay(null)}
          ></div>
          <AddTask />
        </div>
      )}
      {selectedEditTask && (
        <div>
          <div
            className="add-overlay"
            onClick={() => setSelectedEditTask(null)}
          ></div>
          <EditTask />
        </div>
      )}

      <div className="home-container">
        <Header /> 
        <SearchBar />
        <Filters />
        <Todos />
      </div>
    </div>
  );
};
export default Home;
