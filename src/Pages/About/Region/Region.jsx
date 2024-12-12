/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css"; 

export default function Region() {
  const [Region, setRegion] = useState([]);
  const [loading, setLoading] = useState(true); 

  const getData = () => {
    axios
      .get("http://localhost:1337/api/regions", {
        params: {
          populate: "*",
        },
      })
      .then(res => {
        setRegion(res.data.data);
        setLoading(false); 
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="my-5">
      <div className="container">
        <div className="row">
          {loading ? (

            Array.from({ length: 1 }).map((_, index) => (
              <div key={index} className="col-12 my-5">
                <Skeleton height={40} width={`80%`} className="mb-2" />
                <Skeleton height={20} width={`60%`} className="mb-2" />
                <div className="row my-3">
                  {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="col-sm-12 col-md-3">
                      <Skeleton height={40} className="mb-2" />
                      <Skeleton height={20} width={`80%`} />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            Region.map((el, index) => {
              return (
                <div key={el.id || index} className="col-12 my-5">
                  <div className="d-flex flex-column align-items-center gap-2 text-center">
                    <h1 className="my-2 w-100 px-4">{el.Region_Title}</h1>
                    <h5 className="my-2 px-2  w-100">{el.Region_P}</h5>
                    <div className="row my-3">
                      <div className="col-sm-12 col-md-3">
                        <h3 className="fw-bold color">{el.CS_grads_Num}%</h3>
                        <p className=" fs-5">{el.CS_grads_Title}</p>
                      </div>
                      <div className="col-sm-12 col-md-3">
                        <h3 className="fw-bold color">{el.Female_CS_Num}%</h3>
                        <p className=" fs-5">{el.Female_CS_Title}</p>
                      </div>
                      <div className="col-sm-12 col-md-3">
                        <h3 className="fw-bold color">{el.Annual_projected_Num}K</h3>
                        <p className=" fs-5">{el.Annual_projected_Title}</p>
                      </div>
                      <div className="col-sm-12 col-md-3">
                        <h3 className="fw-bold color">{el.Highest_Title}</h3>
                        <p className=" fs-5">{el.Highest_p}</p>
                      </div>
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
