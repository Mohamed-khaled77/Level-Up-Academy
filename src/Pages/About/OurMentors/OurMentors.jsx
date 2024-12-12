/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css"; 

export default function OurMentors() {
  const [OurMentors, setOurMentors] = useState([]);
  const [loading, setLoading] = useState(true); 

  const getData = () => {
    axios
      .get("http://localhost:1337/api/our-mentors", {
        params: {
          populate: "*",
        },
      })
      .then(res => {
        setOurMentors(res.data.data);
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
                <Skeleton height={40} width={`80%`} className="mb-2" />
                <Skeleton height={20} width={`60%`} className="mb-2" />
                <Skeleton height={400} className="w-100" />
              </div>
            ))
          ) : (
            OurMentors.map((el, index) => {
              return (
                <div key={el.id || index} className="col-12 mb-4">
                  <div className="d-flex flex-column align-items-center gap-2 text-center">
                    <h1 className="my-2 w-100 px-4">{el.OurMentors_Title}</h1>
                    <p className="my-2 px-2  w-75">{el.OurMentors_p}</p>
                    <div className="col-12 p-2">
                      <img
                        className="w-100 border rounded-4 border-5 border-primary"
                        src={`http://localhost:1337${el.OurMentors_img.url}`}
                        alt="Mentor"
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
