import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { RootContext } from "../App.js";

const Header = () => {
  // const activeStyle = {
  //   color: "green",
  //   fontSize: "2rem"
  // };

  const { globalFeeds, loading } = useContext(RootContext);

  console.log(loading, globalFeeds.articlesCount);

  return (
    <div>
      <nav class="navbar navbar-light">
        <div class="container">
          <a class="navbar-brand" href="index.html">
            conduit
          </a>
          {/* <div>{loading ? "Loading......." : globalFeeds.articlesCount}</div> */}
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              {/* Add "active" class when you're on that page" */}
              {/* <a class="nav-link active" href="">
                Home
              </a> */}
              <NavLink exact to="/" class="nav-link active">
                {/* activeStyle={activeStyle}> */}
                Home
              </NavLink>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">
                <i class="ion-compose"></i>&nbsp;New Post
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </a>
            </li>
            <li class="nav-item">
              <NavLink exact to="/login" class="nav-link">
                {/* activeStyle={activeStyle}> */}
                Sign up
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
