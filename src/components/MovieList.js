import React, { useState, useEffect } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import axios from "axios";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [sortBy, setSortBy] = useState("");

  const fetchMovie = (sortBy, first) => {
    let url = "";
    if (sortBy && !first) {
      url = `https://yts.mx/api/v2/list_movies.json?limit=4&page=${pageCount}&sort_by=${sortBy}`;
    } else if (first) {
      url = `https://yts.mx/api/v2/list_movies.json?limit=4&page=${1}&sort_by=${sortBy}`;
    } else {
      url = `https://yts.mx/api/v2/list_movies.json?limit=4&page=${pageCount}`;
    }

    try {
      axios.get(url).then((res) => {
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

  useEffect(() => {
    if (sortBy !== "") {
      setMovieList([]);
      setPageCount(1);
      fetchMovie(sortBy, 1);
    }
  }, [sortBy]);

  return (
    <div className="movie-list">
      <div className="sorting-filter-container">
        <div className="sorting">
          <div onClick={() => setSortBy("title")}>제목순</div>
          <div onClick={() => setSortBy("year")}>날짜순</div>
          <div onClick={() => setSortBy("rating")}>별점순</div>
        </div>
        <div className="filter">
          <div>최소별점</div>
        </div>
      </div>
      <BottomScrollListener onBottom={() => fetchMovie(sortBy)}>
        <ul>
          {movieList.length >= 1 &&
            movieList.map((movie) => <MovieCard {...movie} />)}
        </ul>
      </BottomScrollListener>
    </div>
  );
};

export default MovieList;
