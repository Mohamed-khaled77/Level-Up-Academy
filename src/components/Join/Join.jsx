// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
export default function Join() {
  const [Join, setJoin] = useState([]);
  const [loading, setLoading] = useState(true); 

  const getData = () => {
    axios
      .get("http://localhost:1337/api/joins", {
        params: {
          populate: "*",
        },
      })
      .then(res => {
        setJoin(res.data.data);
        setLoading(false); 
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-5 my-5">
      <div className="container">
        <div className="row">
          {loading ? (
            <div className="col-12 py-2 mb-4">
              <div className="d-flex flex-column align-items-center gap-2 text-center">
                <Skeleton height={30} width={`75%`} className="mb-2" />
                <Skeleton height={20} width={`75%`} className="mb-2" />
                <Skeleton height={40} width={150} className="mt-3" />
              </div>
            </div>
          ) : (
            Join.map((el, index) => {
              return (
                <div key={el.id || index} className="col-12 py-2 mb-4">
                  <div className="d-flex flex-column w-100 col-12 align-items-center gap-2 text-center">
                    <h2 className="my-2 w-100 px-2">{el.Join_Title}</h2>
                    <p className="px-3 w-100">{el.Join_p}</p>
                    <Link className="btn btn-primary rounded-pill px-4 py-2 mt-3" to="/Login"> Sign Up for Free</Link>
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
