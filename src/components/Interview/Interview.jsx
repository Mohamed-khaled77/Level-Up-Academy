// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import LazyLoad from 'react-lazy-load';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./Interview.scss";
import { Link } from "react-router-dom";
export default function Interview() {
  const [Interview, setInterview] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    axios
      .get("http://localhost:1337/api/interviews", {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        setInterview(res.data.data);
        setLoading(false); 
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <div className="container my-5">
        <div>
          {loading ? (

            <div className="d-flex flex-column gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="row interview-section-item my-5">
                  <div className="col-12 col-md-6 text-center">
                    <Skeleton height={40} width={`80%`} className="mb-3" />
                    <Skeleton count={2} width={`90%`} />
                    <Skeleton height={30} width={`60%`} className="mt-3" />
                  </div>
                  <div className="col-12 col-md-6">
                    <Skeleton height={300} className="rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            Interview.map((el, index) => {
              return (
                <div
                  key={el.id || index}
                  className="col-12 row d-flex justify-content-center align-items-center interview-section-item my-5"
                >
                  <div className="col-12 col-md-6 text-center text-md-start mb-4">
                    <h3 className=" text-center">{el.Interview_Title}</h3>
                    <p className=" text-center">{el.Interview_p}</p>
                    <h4 className="text-center">{el.Interview_sacndTitle}</h4>
                    <Link className="btn btn-primary rounded-pill px-4 py-2 mt-3" to="/Login">Learn More</Link>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="img-container">
                      <LazyLoad offset={300}>
                        <img
                          className="rounded shadow-sm"
                          src={`http://localhost:1337${el.Interview_img.url}`}
                          alt="Interview"
                        />
                      </LazyLoad>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
