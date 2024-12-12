// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Teacher.scss";

export default function Teacher() {
  const [Teacher, setTeacher] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const getData = () => {
    axios
      .get("http://localhost:1337/api/teachers", {
        params: {
          populate: "*",
        },
      })
      .then(res => {
        setTeacher(res.data.data);
        setIsLoading(false); 
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <div className="container">
        <div className="row">
          <div className="col-12 my-4">
            <h4 className="text-center">Testimonials</h4>
          </div>
          {isLoading ? (
            <div className="col-12 col-md-4 mb-4">
              <Skeleton height={200} className="my-3" />
              <Skeleton width={100} height={30} className="my-3" />
              <Skeleton count={3} height={20} className="my-3" />
            </div>
          ) : (
            Teacher.map((el, index) => {
              return (
                <div key={el.id || index} className="col-12 col-md-4 mb-4">
                  <div className="h-100">
                    <div className="card-body d-flex flex-column align-items-center gap-2 text-start ">
                      <img
                        src={`http://localhost:1337${el.Teacer_img.url}`}
                        alt=""
                        className="img-fluid"
                      />
                      <h4 className="mt-2">{el.Teacer_name}</h4>
                      <h6>{el.Teacer_Job}</h6>
                      <p>{el.Teacer_p}</p>
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
