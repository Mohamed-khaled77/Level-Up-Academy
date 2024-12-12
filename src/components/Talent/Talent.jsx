// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Talent.scss";
import { Link } from "react-router-dom";

export default function Talent () {
  const [Talent, setTalent] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const getData = () => {
    axios
      .get("http://localhost:1337/api/talents", {
        params: {
          populate: "*",
        },
      })
      .then(res => {
        setTalent(res.data.data);
        setIsLoading(false); 
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {isLoading ? (
          <div className="col-12">
            <Skeleton height={50} className="my-3" />
            <Skeleton count={3} height={100} className="my-3" />
          </div>
        ) : (
          Talent.map((el, index) => {
            return (
              <div key={el.id || index} className="col-12  mb-4">
                <div className="back rounded-5 p-5">
                  <div className="d-flex flex-column align-items-center gap-2 text-center">
                    <h2 className="my-2  px-2">{el.Talent_Title}</h2>
                    <p className="px-2  w-75">{el.Talent_p}</p>
                    <Link className="btn btn-primary rounded-pill px-4 py-2 mt-3" to="/Login">  Get Started Today</Link>
                    
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
