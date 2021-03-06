import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <NavLink to="/" exact>
        <div className="header-item">Home</div>
      </NavLink>
      <NavLink to="/movies" exact>
        <div className="header-item">Movies</div>
      </NavLink>
    </div>
  );
};

export default Header;
