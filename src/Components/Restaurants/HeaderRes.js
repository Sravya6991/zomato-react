import React from "react";
import {Link} from "react-router-dom";
import Header from "../Header";


const HeaderRes = () => {
  return (
    <header>
      <nav className="navbar navbar-expand">
        <div className="container-fluid justify-content-end" id="cusinie-header">
          <Link to={"/"}
            href="index.html"
            id="res-logo"
            className="navbar-brand"
            style={{textDecoration: "none"}}
          >
            e!
          </Link>
          
          <Header/>
        </div>
      </nav>
    </header>
  );
};

export default HeaderRes;
