// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Footer() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // تأخير تحميل البيانات لمحاكاة التحميل
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="">
      <div className="container rounded-3 py-5">
        <div className="row justify-content-center align-items-start">
          {loading ? (
            <>
              {/*Skeleton Loading UI*/}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="col-sm-12 col-md-3 mb-4">
                  <Skeleton width="60%" className="mb-3" />
                  <Skeleton count={4} />
                </div>
              ))}
            </>
          ) : (
            <>
              {/* Content After Data Load */}
              <div className="col-sm-12 col-md-3">
                <div className="d-flex flex-column gap-2">
                  <p className="fs-5">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, praesentium?
                  </p>
                </div>
              </div>
              <div className="col-sm-12 col-md-3">
                <div className="d-flex flex-column gap-2">
                  <h3>For Talent</h3>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/Login" className="nav-link">Sign Up for Level Up Academy</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-12 col-md-3">
                <div className="d-flex flex-column gap-2">
                  <h3>For Companies</h3>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/Home" className="nav-link">Lorem, ipsum.</Link>
                    </li>
                    <li>
                      <Link to="/Home" className="nav-link">Lorem, ipsum.</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-12 col-md-3">
                <div className="d-flex flex-column gap-2">
                  <h3>About Level Up Academy</h3>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/Home" className="nav-link">Lorem, ipsum.</Link>
                    </li>
                    <li>
                      <Link to="/Home" className="nav-link">Lorem, ipsum dolor.</Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Footer Text */}
              <div className="col-12 mt-4">
                <p className="text-center">&copy; 2024 Level Up Academy. All rights reserved.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
