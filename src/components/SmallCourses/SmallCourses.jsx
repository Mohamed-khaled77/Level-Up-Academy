// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SmallCourses() {
  const [SmallCourses, setSmallCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const getData = () => {
    axios
      .get("http://localhost:1337/api/small-courses", {
        params: {
          populate: "*",
        },
      })
      .then(res => {
        setSmallCourses(res.data.data);
        setIsLoading(false); 
        console.log(res.data.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="my-5 p-0 ">
        {isLoading ? (
          <div>
            <Skeleton height={30} count={3} className="my-3" />
            <Skeleton height={200} className="my-3" />
          </div>
        ) : (
          SmallCourses.map((el, index) => {
            return (
              <div
                key={el.id || index}
                className="hero-section-item row px-4"
              >
                <div className="col-sm-12 my-5 d-flex flex-column">
                  <h2 className=" text-center my-2">
                    {el.SmallCourses_Title}
                  </h2>
                  <p className="text-center">{el.SmallCourses_p}</p>
                </div>
                <div className="col-sm-12 my-5 rounded-pill">
                  <div>
                    <img
                      className="rounded-4 w-100"
                      src={`http://localhost:1337${el.SmallCourses_img.url}`}
                      alt="Hero"
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
