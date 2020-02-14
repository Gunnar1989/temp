import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../util/Routing";

const Navigation = () => (
  <div className="navbar-start ">
    <Link className="navbar-item" to={ROUTES.HOME.PATH}>
      Home
    </Link>
  </div>
);

export default Navigation;
