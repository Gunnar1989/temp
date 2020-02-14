import React, { useState, useEffect } from "react";
import useAuth from "../../auth/use-auth";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import * as ROUTES from "../util/Routing";
import gear from "../../static/img/gear.png";

export default function HeaderLogin(props) {
  let history = useHistory();
  const [active, setActive] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState([]);
  const { user, signout, isLoading, getLoggedInUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getLoggedInUser(user.uid);
        setLoggedInUser(response);
      } catch {
        console.log("Err");
      }
    }
    fetchData();
  }, []);

  function isLoggedIn() {
    return user == null;
  }
  function signOutAndRedirect() {
    signout();
    setActive(!active);
    history.replace("/");
  }
  return isLoggedIn() ? (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <Link className="button is-primary" to={ROUTES.HOME.PATH}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <nav
      className="navbar has-background-primary"
      role="navigation"
      aria-label="dropdown navigation"
    >
      <div
        className={
          active
            ? "navbar-item has-dropdown"
            : "navbar-item has-dropdown is-active"
        }
      >
        <span
          className="navbar-link is-rounded"
          onClick={() => setActive(!active)}
        >
          <img src={gear} />
        </span>
        <div className="navbar-dropdown has-text-primary	 is-right">
          <Link
            to={ROUTES.EDIT_PROFILE.PATH}
            onClick={() => {
              setActive(!active);
            }}
            className="navbar-item"
          >
            View User
          </Link>
          <Link
            to={ROUTES.HOME.PATH}
            disabled={isLoading}
            onClick={() => {
              signOutAndRedirect();
              setLoggedInUser([]);
            }}
            className="navbar-item"
          >
            Sign Out
          </Link>
          <hr className="navbar-divider" />
          <div className="navbar-item">Version 0.0.1</div>
        </div>
      </div>
    </nav>
  );
}
