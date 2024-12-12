import axios from "axios";
import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton"; 
import "./Courses.scss";

export default function Courses() {
  const [Courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [isScrolling, setIsScrolling] = useState(false); 
  const getData = () => {
    axios
      .get("http://localhost:1337/api/cards", {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        setCourses(res.data.data);
        setIsLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setIsLoading(false); 
      });
  };


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true); 
    };

    const handleStopScrolling = () => {
      setTimeout(() => setIsScrolling(false), 150); 
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleStopScrolling);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleStopScrolling);
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <div key={index} className="col-sm-12 col-md-4 hov">
              <div className="rounded-3 my-3">
                <Skeleton
                  height={200}
                  className="card-img-top w-100 rounded-top-3 skeleton"
                />
                <div className="card-body my-2 p-2 skeleton">
                  <Skeleton
                    height={30}
                    width="60%"
                    className="card-title mb-2 skeleton"
                  />
                  <Skeleton
                    height={20}
                    width="80%"
                    className="card-text mb-2 skeleton"
                  />
                  <div className="d-flex justify-content-between">
                    <Skeleton width="40%" height={20} className="skeleton" />
                    <Skeleton width="40%" height={20} className="skeleton" />
                  </div>
                  <div className="my-3">
                    <Skeleton
                      width="100%"
                      height={40}
                      className="btn btn-outline-primary rounded-pill skeleton"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          Courses.map((el, index) => {
            return (
              <div key={el.documentId || index} className="col-sm-12 col-md-4 hov">
                <div
                  className={`rounded-3 my-3 ${isScrolling ? "no-hover" : ""}`} 
                >
                  <img
                    src={`http://localhost:1337${el.Card_img.url}`}
                    className="card-img-top rounded-top-3 w-100"
                    alt={el.Card_Title || "Course Image"}
                  />
                  <div className="card-body my-2 p-2">
                    <h5 className="card-title text-black fw-bold border-bottom py-2">
                      {el.Card_Title}
                    </h5>
                    <p className="card-text text-muted border-bottom py-2">
                      {el.Card_p}
                    </p>
                    <div className="d-flex justify-content-between">
                      <p className="text-muted">
                        <FontAwesomeIcon icon={faLayerGroup} className="me-2" />{" "}
                        Courses {el.Courses_num}
                      </p>
                      <p className="card-text text-muted">
                        <FontAwesomeIcon icon={faClock} className="me-2" />
                        {el.courses_aower}
                      </p>
                    </div>

                    <div className="my-3">
                      <Link
                        className="btn btn-outline-primary rounded-pill d-flex justify-content-center text-center"
                        to={`/courses/${el.documentId}`} 
                      >
                        Learn More
                      </Link>
                    </div>
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
