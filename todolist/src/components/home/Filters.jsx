import React, { useEffect } from "react";
import { filterEndpoints } from "../../helper/filter";
import { useRecoilState } from "recoil";
import todoData from "../../recoil/todoData";
import apiDataAtom from "../../recoil/apiDataAtom";
import activeFilter from "../../recoil/activeFilter";
import filterDataAtom from "../../recoil/filterDataAtom";

const Filters = (props) => {
  const [activeFilterValue, setActiveFilterValue] =
    useRecoilState(activeFilter);
  const [todoApiData, setTodoApiData] = useRecoilState(todoData);
  // const [apiData,setApiData] =useRecoilState(apiDataAtom);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);

  useEffect(() => {
    console.log("filterData");
    console.log(filterData);
  }, [filterData]);

  return (
    <div>
      <div className="filter-container">
        {filterData?.map((data, index) => {
          return (
            <div
              key={index}
              className="filter-btn-container"
              onClick={() => setActiveFilterValue(data?.label)}
            >
              <button
                onClick={() => {
                  fetch(
                    "http://127.0.0.1:8000/" + filterEndpoints[index]?.endpoint,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error("Network response was not ok");
                      }
                      return response.json();
                    })
                    .then((data) => {
                      console.log(data);
                      // setApiData(data);
                      setTodoApiData(data?.todo_data);
                      setFilterData(data?.stats);
                      // to display only the tasks that are completed
                    })
                    .catch((error) => {
                      alert(error);
                    });
                }}
                className={`${
                  activeFilterValue === data?.label ? "active-filter" : ""
                }`}
              >
                <h3>{data?.label}</h3>
                <p
                  className={`${
                    activeFilterValue === data?.label
                      ? "active-filter-value"
                      : ""
                  }`}
                >
                  {data?.value}
                </p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
