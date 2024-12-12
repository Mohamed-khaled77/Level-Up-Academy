/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; 

export default function AboutTitle() {
  const [AboutTitle, setAboutTitle] = useState([]);
  const [loading, setLoading] = useState(true); 

  const getData = () => {
    axios
      .get("http://localhost:1337/api/about-titles", {
        params: {
          populate: "*",
        },
      })
      .then(res => {
        setAboutTitle(res.data.data);
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
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="col-12 mb-4">
                <Skeleton height={50} width={`80%`} className="mb-2" />
                <Skeleton height={25} width={`60%`} className="mb-2" />
                <Skeleton height={300} className="w-100" />
              </div>
            ))
          ) : (
            AboutTitle.map((el, index) => {
              return (
                <div key={el.id || index} className="col-12 mb-4">
                  <div className="d-flex flex-column align-items-center gap-2 text-center">
                    <h1 className="my-2 w-100 px-4">{el.Abo_Title}</h1>
                    <h5 className="my-2 px-2  w-75">{el.Abo_p}</h5>
                    <div className="col-12">
                      <img
                        className="w-100 px-4 rounded-4"
                        src={`http://localhost:1337${el.Abo_img.url}`}
                        alt="About"
                      />
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
