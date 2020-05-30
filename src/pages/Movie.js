import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";

const Movie = () => {
  const movieId = useParams().id;

  return <MovieDetails id={movieId} />;
};

export default Movie;
