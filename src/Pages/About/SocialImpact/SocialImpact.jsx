// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import LazyLoad from "react-lazy-load"; 
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css";

export default function SocialImpact() {
  const [SocialImpact, setSocialImpact] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    axios
      .get("http://localhost:1337/api/social-lmpacts", {
        params: {
          populate: "*",
        },
      })
      .then(res => {
        setSocialImpact(res.data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="my-5">
      <div className="container">
        {loading ? (
          Array.from({ length: 1 }).map((_, index) => (
            <div key={index} className="col-12 mb-4">
              <Skeleton height={40} width="80%" className="my-2" />
              <Skeleton height={20} width="60%" className="my-2" />
              <div className="row">
                <div className="col-sm-12 col-md-3">
                  <Skeleton height={200} width="100%" className="my-2" />
                </div>
                <div className="col-sm-12 col-md-6">
                  <Skeleton height={200} width="100%" className="my-2" />
                </div>
                <div className="col-sm-12 col-md-3">
                  <Skeleton height={200} width="100%" className="my-2" />
                </div>
              </div>
            </div>
          ))
        ) : (
          SocialImpact.map((el, index) => {
            return (
              <div key={el.id || index} className="col-12 mb-4">
                <div className="d-flex flex-column align-items-center gap-2 text-center">
                  <h1 className="my-2 w-100 px-4">{el.Social_Impact_Title}</h1>
                  <h5 className="my-2 px-2  w-75">{el.Social_Impact_p}</h5>
                  <div className="row">
                    <div className="col-sm-12 col-md-3">
                      <LazyLoad offset={300}>
                        <img
                          className="w-100 px-1 rounded-4 object-fit-contain my-2"
                          src={`http://localhost:1337${el.Social_Impact_img_one.url}`}
                          alt=""
                        />
                      </LazyLoad>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <LazyLoad offset={300}>
                        <img
                          className="w-100 px-1 rounded-4 object-fit-contain my-2"
                          src={`http://localhost:1337${el.Social_Impact_img_two.url}`}
                          alt=""
                        />
                      </LazyLoad>
                    </div>
                    <div className="col-sm-12 col-md-3">
                      <LazyLoad offset={300}>
                        <img
                          className="w-100 px-1 rounded-4 object-fit-contain my-2"
                          src={`http://localhost:1337${el.Social_Impact_img_thery.url}`}
                          alt=""
                        />
                      </LazyLoad>
                    </div>
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
