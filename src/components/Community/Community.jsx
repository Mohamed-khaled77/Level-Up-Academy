import "./Community.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css";
import LazyLoad from "react-lazy-load";

export default function Community() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true); 

  const getWorks = () => {
    axios
      .get("http://localhost:1337/api/works", {
        params: {
          populate: "*",
        },
      })
      .then(res => {
        setWorks(res.data.data);
        setLoading(false); 
      });
  };

  useEffect(() => {
    getWorks();
  }, []);

  return (
    <div className="container">
      <div className="row my-5 justify-content-center">
        <div
          key={1234567}
          className="d-flex flex-wrap justify-content-center align-items-center border p-2 my-5 rounded-5 bg-white col-12"
        >
          <h4 className="col-12 p-2">Our community works for...</h4>
          {loading ? (

            <div className="d-flex flex-wrap justify-content-center">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="col-sm-12 col-md-3 p-2">
                  <Skeleton height={200} />
                </div>
              ))}
            </div>
          ) : (
            works.map((el, index) => (
              <div key={index} className="col-sm-12 col-md-3">
                <LazyLoad offset={300}>
                  <img
                    className="sataimg p-2 m-auto"
                    src={`http://localhost:1337${el.Work_img.url}`}
                    alt={`Work ${index + 1}`} 
                  />
                </LazyLoad>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
