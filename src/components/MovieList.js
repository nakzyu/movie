import React, { useState, useEffect } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import axios from "axios";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [sortBy, setSortBy] = useState();
  const [qualityFilter, setQualityFilter] = useState();
  const [ratingFilter, setRatingFilter] = useState();

  const fetchMovie = async () => {
    let url = `https://yts.mx/api/v2/list_movies.json?limit=4&page=${pageCount}`;

    if (sortBy) url += `&sort_by=${sortBy}`;
    if (qualityFilter) url += `&quality=${qualityFilter}`;
    if (ratingFilter) url += `&minimum_rating=${ratingFilter}`;

    try {
      await axios.get(url).then((res) => {
        setMovieList((oldArr) => {
          if (pageCount === 1) return [...res.data.data.movies];
          else return [...oldArr, ...res.data.data.movies];
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [sortBy, pageCount, ratingFilter, qualityFilter]);

  return (
    <div className="movie-list">
      <div className="sorting-filter-container">
        <div className="sorting">
          {/* title,year,rating 순으로 정렬하는 div */}
          {["title", "year", "rating"].map((sortType) => (
            <div
              className="sorting-type"
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
          <div className="quality-filter">
            최소별점
            <ul>
              {["720p", "1080p", "2160p", "3D"].map((quality) => (
                <li
                  onClick={() => {
                    if (quality !== qualityFilter) {
                      // 현재 quality 와 선택한 qualityFilter가 다를때만 실행
                      setMovieList([]);
                      setQualityFilter(quality);
                      setPageCount(1);
                    }
                  }}
                >
                  {quality}
                </li>
              ))}
            </ul>
          </div>
          <div className="minimum-rating-filter">
            최소별점
            <ul>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => (
                <li
                  onClick={() => {
                    if (ratingFilter !== rating) {
                      // 현재 rating 과 선택한 ratingfilter가 다를때만 실행
                      setMovieList([]);
                      setRatingFilter(rating);
                      setPageCount(1);
                    }
                  }}
                >
                  {rating}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <BottomScrollListener
        onBottom={() => {
          // bottom 을 hit시 pageCount+1
          setPageCount((state) => state + 1);
        }}
      >
        <ul>
          {movieList.map((movie) => (
            <MovieCard {...movie} />
          ))}
        </ul>
      </BottomScrollListener>
    </div>
  );
};

export default MovieList;
