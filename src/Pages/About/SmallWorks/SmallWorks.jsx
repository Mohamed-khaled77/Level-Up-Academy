import axios from "axios";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazy-load"; 
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
        <div key={1234567} className="d-flex flex-wrap justify-content-center align-items-center border p-2 my-5 rounded-5 bg-white col-10">
          <h4 className="col-12 p-2">Our community works for...</h4>
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="col-sm-12 col-md-3 d-flex justify-content-center">
                  <Skeleton height={150} width={`100%`} />
                </div>
              ))
            : works.slice(0, 4).map((el, index) => {
                return (
                  <div key={index} className="col-sm-12 col-md-3 d-flex justify-content-center">
                    <LazyLoad offset={300}>
                      <img
                        className="sataimg px-2 m-auto"
                        src={`http://localhost:1337${el.Work_img.url}`}
                        alt="Work"
                      />
                    </LazyLoad>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
