// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./HeroSection.scss";
import axios from "axios";
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function HeroSection() {
  const [Hero, setHero] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { isLoggedIn } = useAuth(); 
  const getData = () => {
    axios
      .get("http://localhost:1337/api/hero-sections", {
        params: {
          populate: "*",
        },
      })
      .then((res) => {
        setHero(res.data.data);
        setLoading(false); 
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" container">
      <div className="my-5">
        {loading ? (

          <div className="row d-flex align-items-center hero-section-item">
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <Skeleton height={40} width="70%" className="mb-2" />
              <Skeleton count={3} />
              <Skeleton height={50} width="30%" className="mt-3" />
            </div>
            <div className="col-12 col-md-6">
              <Skeleton height={300} width="100%" />
            </div>
          </div>
        ) : (
          Hero.map((el, index) => {
            return (
              <div
                key={el.id || index}
                className="row g-5 d-flex align-items-center hero-section-item"
              >
                <div className="col-12 col-md-6 text-center text-md-start mb-4 mb-md-0">
                  <h1 className="display-5 fw-bold">{el.Hero_Title}</h1>
                  <p className="">{el.Hero_p}</p>

                  {!isLoggedIn && ( 
                    <Link
                      className="btn btn-primary rounded-pill px-4 py-2 mt-3"
                      to="/Login"
                    >
                      Sign Up for Free
                    </Link>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <div className="w-100">
                    <img
                      className="img-fluid rounded shadow-sm"
                      src={`http://localhost:1337${el.Hero_img.url}`}
                      alt="Hero"
                    />
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
