import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import "./Header.scss";
import { ROUTES } from "../../constants";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__box">
          <Link to={ROUTES.home} className="header__logo">
            <img src={logo} alt="" />
            {/*<img src={require("../../assets/img/logo.svg").default} alt="" />*/}
          </Link>

          <nav className="header__nav">
            <NavLink exact to={ROUTES.home}>
              Login
            </NavLink>
            <NavLink exact to={ROUTES.todos}>
              Todos
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
