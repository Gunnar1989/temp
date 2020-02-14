import React, { useState } from "react";
import HeaderLogin from "./HeaderLogin";
import { withRouter } from "react-router-dom";
import Navigation from "../Elements/Navigation";

function Header() {
  const [active, setActive] = useState(false);
  return (
    <nav
      className="bd-navbar navbar has-shadow has-background-primary is-spaced"
      role="navigation"
      aria-label="main navigation"
    >
      <a
        alt="menu"
        role="button"
        className={
          active ? "navbar-burger burger" : "navbar-burger burger is-active"
        }
        aria-label="menu"
        aria-expanded="false"
        data-target="Links"
        onClick={() => setActive(!active)}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <div
        id="Links"
        className={
          active
            ? "navbar-menu"
            : "navbar-menu has-background-primary has-text-centered is-active"
        }
      >
        <Navigation />
        <HeaderLogin />
      </div>
    </nav>
  );
}
export default withRouter(Header);
