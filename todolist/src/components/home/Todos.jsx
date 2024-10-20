import React from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// recoil
import { useRecoilState } from "recoil";
import searchTextAtom from "../../recoil/searchTextAtom";
import todoData from "../../recoil/todoData";
import editTaskAtom from "../../recoil/editTaskAtom";
import filterDataAtom from "../../recoil/filterDataAtom";
import activeFilter from "../../recoil/activeFilter";

const Todos = () => {
  // global variables
  const [todoApiData, setTodoApiData] = useRecoilState(todoData);
  const [activeFilterValue, setActiveFilterValue] =
    useRecoilState(activeFilter);
  const [selectedEditTask, setSelectedEditTask] = useRecoilState(editTaskAtom);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);
  // local variables
  const [inputData, setInputData] = useRecoilState(searchTextAtom);

  return (
    <div className="todo-main-container">
      <div>
        {todoApiData
          ?.filter((filtered_data) => {
            if (inputData === "") {
              return filtered_data;
            } else if (
              filtered_data?.title
                ?.toLowerCase()
                ?.includes(inputData?.toLowerCase())
            ) {
              return filtered_data;
            }
          })
          ?.map((data, index) => {
            return (
              <div
                key={index}
                className="todo-card"
                // added click on by myself 
                onClick={() => setActiveFilterValue(data?.label)}
              >
                <div>
                  <div
                    onClick={() => {
                      const bodyData = {
                        id: data?.id,
                      };
                      fetch("http://127.0.0.1:8000/complete_task", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(bodyData),
                      })
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error("Network response was not ok");
                          }
                          return response.json();
                        })
                        .then((res) => {
                          console.log(res);
                          setTodoApiData(res?.todo_data);
                          setFilterData(res?.stats);
                        })
                        .catch((error) => {
                          console.log("Error", error);
                        });
                    }}
                    className={` ${
                      data?.status === "completed"
                        ? "checkbox-active"
                        : "checkbox"
                    } `}
                  ></div>
                </div>
                <div className="todo-content-container">
                  <div className="todo-card-header">
                    <h2
                      className={` ${
                        data?.status === "completed"
                          ? "completed-todo-title"
                          : ""
                      } todo-title`}
                    >
                      {data?.title}
                    </h2>
                    <div className="icon-container">
                      <ArchiveOutlinedIcon
                        className="archive"
                        onClick={() => {
                          const bodyData = {
                            id: data?.id,
                          };
                          fetch("http://127.0.0.1:8000/archived_task", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(bodyData),
                          })
                            .then((response) => {
                              if (!response.ok) {
                                throw new Error("Network response was not ok");
                              }
                              return response.json();
                            })
                            .then((res) => {
                              console.log(res);
                              setTodoApiData(res?.todo_data);
                              setFilterData(res?.stats);
                            })
                            .catch((error) => {
                              console.log("Error", error);
                            });
                        }}
                      />
                      <BorderColorOutlinedIcon
                        className="edit"
                        onClick={() => {
                          setSelectedEditTask({
                            id: data?.id,
                            title: data?.title,
                            desc: data?.desc,
                          });
                        }}
                      />
                      <DeleteOutlineOutlinedIcon
                        className="delete"
                        onClick={() => {
                          const bodyData = {
                            id: data?.id,
                          };
                          fetch("http://127.0.0.1:8000/delete_task", {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(bodyData),
                          })
                            .then((response) => {
                              if (!response.ok) {
                                throw new Error("Network response was not ok");
                              }
                              return response.json();
                            })
                            .then((res) => {
                              console.log(res);
                              setTodoApiData(res?.todo_data);
                              setFilterData(res?.stats);
                            })
                            .catch((error) => {
                              console.log("Error", error);
                            });
                        }}
                      />
                    </div>
                  </div>
                  <p className="todo-card-desc">{data?.desc}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Todos;
