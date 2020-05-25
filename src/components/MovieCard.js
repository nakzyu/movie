import React from "react";

const MovieCard = ({ title, summary, rating }) => {
  return (
    <li>
      <div>{title}</div>
      <div>{summary}</div>
      <div>{summary}</div>
      <div>{summary}</div>
      <div>{summary}</div>
      <div>{rating}</div>
    </li>
  );
};

export default MovieCard;
