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
          // 선택된 필터로 movie가 없을시 기존 배열과 noMovie를 리턴
          if (!res.data.data.movies) return [...oldArr, ...[{ noMovie: true }]];
          // 연속으로 sortBy를 바꿨을때 Movielist가 합쳐지는것을 방지
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
          {["title", "year", "rating"].map((sortType) => (
            <div
              key={sortType}
              className={`sorting-type ${
                sortBy === sortType ? "tap-active" : ""
              }`}
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
          <div className="quality-filter dropdown">
            <div className={`dropbtn ${qualityFilter ? "tap-active" : ""}`}>
              화질{qualityFilter}
            </div>
            <div className="dropdown-content">
              {["720p", "1080p", "2160p", "3D"].map((quality) => (
                <div
                  key={quality}
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
                </div>
              ))}
            </div>
          </div>
          <div className="minimum-rating-filter dropdown">
            <div
              className={`dropbtn ${
                Number.isInteger(ratingFilter) ? "tap-active" : ""
              }`}
            >
              최소 별점{ratingFilter}
            </div>
            <div className="dropdown-content">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => (
                <div
                  key={rating}
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
                </div>
              ))}
            </div>
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
            <MovieCard key={movie.id} {...movie} />
          ))}
        </ul>
      </BottomScrollListener>
    </div>
  );
};

export default MovieList;
