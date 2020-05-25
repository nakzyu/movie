import React, { useState, useEffect } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import axios from "axios";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const fetchMovie = async () => {
    console.log("ds");
    try {
      await axios
        .get(`https://yts.mx/api/v2/list_movies.json?limit=4&page=${pageCount}`)
        .then((res) => {
          setMovieList((oldArr) => [...oldArr, ...res.data.data.movies]);
          setPageCount((state) => state + 1);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <BottomScrollListener onBottom={() => fetchMovie()}>
      <ul>
        {movieList.length >= 1 &&
          movieList.map((movie) => <MovieCard {...movie} />)}
      </ul>
    </BottomScrollListener>
  );
};

export default MovieList;
