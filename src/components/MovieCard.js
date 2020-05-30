import React from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";

const MovieCard = ({
  title,
  summary,
  rating,
  medium_cover_image,
  noMovie,
  id,
}) => {
  return noMovie ? (
    <div>no movie</div>
  ) : (
    <li className="movie-card">
      <div className="movie-img-wrapper">
        <img src={medium_cover_image} alt="medium_cover_image" />
      </div>
      <div className="movie-content">
        <div className="movie-title_rating">
          <strong>{title}</strong>
          <div>{rating}</div>
        </div>
        <div className="movie-content-description">
          <div>{summary}</div>
          <Link to={`/movie/${id}`}>
            <div className="plus">자세히 보기</div>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default MovieCard;
