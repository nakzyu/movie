import React from "react";
import "./MovieCard.css";

const MovieCard = ({ title, summary, rating, medium_cover_image }) => {
  return (
    <li className="movie-card">
      <img src={medium_cover_image} alt="medium_cover_image" />
      <div className="movie-content">
        <div>{title}</div>
        <div>{summary}</div>
      </div>
      <div className="rating_plus">
        <div>{rating}</div>
        <div>자세히보기</div>
      </div>
    </li>
  );
};

export default MovieCard;
