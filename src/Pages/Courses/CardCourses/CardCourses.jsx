import axios from "axios";
import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLayerGroup, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import "./CardCourses.scss";
import { useTheme } from "@mui/material/styles";

export default function CardCourses() {
  const [cardCourses, setCardCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme(); // استخدام الثيم الحالي

  const getData = () => {
    axios
      .get("http://localhost:1337/api/cards", {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        setCardCourses(res.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div>
        <Link className="btn fs-6 fw-bold text-primary" to="/courses">
          View All <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
        </Link>
      </div>
      <div className="row justify-content-center">
        {isLoading
          ? [...Array(3)].map((_, index) => (
              <div key={index} className="col-sm-12 col-md-4 hov">
                <div className="rounded-3 my-3">
                  <Skeleton className="card-img-top w-100 rounded-top-3" />
                  <div className="card-body my-2 p-2">
                    <Skeleton width="60%" className="card-title mb-2" />
                    <Skeleton width="80%" className="card-text mb-2" />
                    <div className="d-flex justify-content-between">
                      <Skeleton width="40%" />
                      <Skeleton width="40%" />
                    </div>
                    <div className="my-3">
                      <Skeleton
                        width="100%"
                        className="btn btn-outline-primary rounded-pill"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          : cardCourses.slice(0, 3).map((el) => (
              <div key={el.documentId} className="col-sm-12 col-md-4 hov">
                <div
                  className="rounded-3 my-3"
                  style={{
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <img
                    src={`http://localhost:1337${el.Card_img.url}`}
                    className="card-img-top rounded-top-3 w-100"
                    alt={el.Card_Title || "Course Image"}
                  />
                  <div className="card-body my-2 p-2">
                    <h5
                      className="card-title fw-bold border-bottom py-2"
                      style={{ color: theme.palette.text.primary }}
                    >
                      {el.Card_Title}
                    </h5>
                    <p
                      className="card-text border-bottom py-2"
                      style={{ color: theme.palette.text.secondary }}
                    >
                      {el.Card_p}
                    </p>
                    <div className="d-flex justify-content-between">
                      <p style={{ color: theme.palette.text.primary }}>
                        <FontAwesomeIcon
                          icon={faLayerGroup}
                          className="me-2"
                        />
                        Courses {el.Courses_num}
                      </p>
                      <p style={{ color: theme.palette.text.secondary }}>
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
            ))}
      </div>
    </div>
  );
}
