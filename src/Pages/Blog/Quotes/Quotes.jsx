// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
Skeleton;
import "react-loading-skeleton/dist/skeleton.css";
import "./Quotes.scss";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getQuotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": "8WAF9SAp2un5VbpNxS2Dtw==eqsbJ1bpMxX6tWTB",
        },
        params: {
          page: page,
        },
      });
      setQuotes(prevQuotes => [...prevQuotes, ...response.data]);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuotes();
  }, [page]);

  return (
    <div className="col-sm-12 col-md-5 container cont d-flex flex-column overflow-y-scroll  ">
      <h1 className=" p-2 fw-bold ">
        Quotes <FontAwesomeIcon className=" text-warning" icon={faQuoteLeft} />
      </h1>
      <ul className=" p-0 m-0">
        {quotes.length === 0 && loading
          ? Array(3)
              .fill()
              .map((_, i) => (
                <li
                  className="bg-light p-4 my-3 rounded-3 sahdow_quotes"
                  key={i}>
                  <Skeleton height={100} />
                </li>
              ))
          : quotes.map((quote, index) => (
              <li
                style={{ backgroundColor: "#FAF6E3" }}
                className="  p-4 my-3 rounded-3 "
                key={index}>
                <h4 className="text-black">
                  <span className="text-warning fs-2 fw-bold">
                    <FontAwesomeIcon icon={faQuoteLeft} />
                  </span>{" "}
                  {quote.quote}{" "}
                  <span className="text-warning fs-2 fw-bold">
                    <FontAwesomeIcon icon={faQuoteRight} />
                  </span>
                </h4>
                <h6 className=" text-black">- {quote.author}</h6>
              </li>
            ))}
      </ul>
      {loading && (
        <div className="my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <button
        className="btn btn-warning container fw-bold  mt-3 "
        onClick={() => setPage(prevPage => prevPage + 1)}
        disabled={loading}>
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
