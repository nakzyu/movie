import React, { useState, useEffect } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import axios from "axios";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [sortBy, setSortBy] = useState();
  const [filterdList, setFilterdList] = useState([]);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [leastRating, setLeastRating] = useState(0);

  const fetchMovie = async () => {
    let url = "";

    if (sortBy) {
      url = `https://yts.mx/api/v2/list_movies.json?limit=4&page=${pageCount}&sort_by=${sortBy}`;
    } else {
      url = `https://yts.mx/api/v2/list_movies.json?limit=4&page=${pageCount}`;
    }

    try {
      // fetch 될때까지 await
      await axios.get(url).then((res) => {
        setMovieList((oldArr) => [...oldArr, ...res.data.data.movies]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [sortBy, pageCount]);

  const filterByRating = (rating) => {
    setIsFilterOn(true);
    setLeastRating(rating);
    setFilterdList(movieList.filter((movie) => movie.rating >= rating));
  };

  useEffect(() => {
    setFilterdList(movieList.filter((movie) => movie.rating >= leastRating));
  }, [movieList, leastRating]);

  return (
    <div className="movie-list">
      <div className="sorting-filter-container">
        <div className="sorting">
          {/* title,year,rating 순으로 정렬하는 div */}
          {["title", "year", "rating"].map((sortType) => (
            <div
              className={`sorting-type`}
              onClick={() => {
                if (sortBy !== sortType) {
                  // 현재 sortBy 와 선택한 sortType이 다를때만 실행
                  setMovieList([]);
                  setSortBy(sortType);
                  setPageCount(1);
                }
              }}
            >
              {sortType}
            </div>
          ))}
        </div>
        <div className="filter">
          <label for="selecte-filter">최소별점:</label>
          <ul>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => (
              <li
                onClick={() => {
                  filterByRating(rating);
                }}
              >
                {rating}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BottomScrollListener
        onBottom={() => {
          // bottom 을 hit시 pageCount+1
          setPageCount((state) => state + 1);
        }}
      >
        <ul>
          {isFilterOn
            ? filterdList.map((movie) => <MovieCard {...movie} />)
            : movieList.map((movie) => <MovieCard {...movie} />)}
        </ul>
      </BottomScrollListener>
    </div>
  );
};

export default MovieList;
