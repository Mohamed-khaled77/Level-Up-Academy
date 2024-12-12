// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Expert.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
export default function Expert() {
  const [Expert, setExpert] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    axios
      .get("http://localhost:1337/api/experts", {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        setExpert(res.data.data);
        setLoading(false); 
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <div className="container my-5">
        {loading ? (
          <div className="row g-4 d-flex align-items-center justify-content-center">
            <div className="col-12 col-md-6 text-center text-md-start">
              <Skeleton height={40} width={`60%`} className="mb-3" />
              <Skeleton count={3} />
              <Skeleton width={150} height={40} className="mt-3" />
            </div>
            <div className="col-12 col-md-6">
              <Skeleton height={300} className="w-100 rounded" />
            </div>
          </div>
        ) : (
          Expert.map((el, index) => {
            return (
              <div
                key={el.id || index}
                className="expert-section row g-4 d-flex align-items-center justify-content-center"
              >
                <div className="col-12 col-md-6 text-center text-md-start">
                  <h1 className="display-6">{el.Expert_Title}</h1>
                  <p className="">{el.Expert_p}</p>
                  <Link className="btn btn-primary rounded-pill px-4 py-2 mt-3" to="/Login">Learn More</Link>
                </div>
                <div className="col-12 col-md-6">
                  <div className="img-container">
                    <img
                      className="img-fluid rounded shadow-sm"
                      src={`http://localhost:1337${el.Expert_img.url}`}
                      alt="Expert"
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
