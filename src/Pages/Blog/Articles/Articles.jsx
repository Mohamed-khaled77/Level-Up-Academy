// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css"; 
import "./Articles.scss";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=f0533f05a2f24325a07c5917f54e1cdc`
        );
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="co-sm-12 col-md-7 con container">
      <h1 className="p-2 fw-bold">
        Articles <FontAwesomeIcon className="text-primary" icon={faNewspaper} />
      </h1>
      {loading ? (
        <div>
          {Array(5)
            .fill()
            .map((_, index) => (
              <div key={index} className="my-3">
                <Skeleton height={150} />
              </div>
            ))}
        </div>
      ) : (
        <ul className="">
          {articles.map((article, index) => (
            <li className="rounded-3 border p-4 my-3 border-0 bg-primary text-white" key={index}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a
                className="text-white btn"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Articles;
