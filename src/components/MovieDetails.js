import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";

const MovieDetails = ({ id }) => {
  const [movie, setMovie] = useState();

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    let url = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;
    try {
      await axios.get(url).then((res) => {
        setMovie(res.data.data.movie);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      {movie && (
        <div className="movie-details-wrapper">
          <div className="movie-details">
            <div className="movie-details-img-wrapper">
              <img src={movie.large_cover_image} alt="large_cover_image" />
            </div>
            <div className="movie-details-content">
              <div className="movie-details-title_rating">
                <strong>{movie.title_long}</strong>
                <div>{movie.rating}</div>
              </div>
              <div className="movie-details-content-description">
                <div>Like: {movie.like_count}</div>
                <div>Download: {movie.download_count}</div>
                <div className="description">{movie.description_full}</div>
              </div>
            </div>
          </div>
          <Link to={`/movies`}>
            <div className="back">리스트로 돌아가기</div>
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default MovieDetails;
