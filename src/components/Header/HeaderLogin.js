import React, { useState, useEffect, useRef } from "react";
import useAuth from "../../auth/use-auth";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import * as ROUTES from "../util/Routing";
import gear from "../../static/img/gear.png";

export default function HeaderLogin(props) {
  let history = useHistory();
  const [active, setActive] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState([]);
  const { user, signout, isLoading, getLoggedInUser, userInfo } = useAuth();

  function useOutsideAlerter(ref) {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(false);
      }
    }

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }
  useEffect(() => {
    async function fetchData() {
      console.log(userInfo);
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
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return isLoggedIn() ? (
    <>
      <p class="menu-label is-hidden-touch">User</p>
      <ul class="menu-list">
        <li>
          <Link className="button is-primary" to={ROUTES.HOME.PATH}>
            Sign In
          </Link>
        </li>
      </ul>{" "}
    </>
  ) : (
    <div ref={wrapperRef} class="">
      <figure class="image is-4x3">
        <img
          class="is-rounded"
          src="https://pbs.twimg.com/media/B_YtPtIVAAEFj_g.jpg"
        />
      </figure>
      <div class="navbar-menu">
        <div class="navbar-start">
          <div
            class={
              active
                ? "navbar-item has-dropdown is-active"
                : "navbar-item has-dropdown"
            }
          >
            <a
              class="navbar-link"
              onClick={() => {
                setActive(!active);
              }}
            >
              {userInfo.userName}
            </a>

            <div class="navbar-dropdown">
              <Link class="navbar-item" to={ROUTES.EDIT_PROFILE.PATH}>
                Settings
              </Link>

              <Link
                class="navbar-item"
                to={ROUTES.HOME.PATH}
                disabled={isLoading}
                onClick={() => {
                  signOutAndRedirect();
                  setLoggedInUser([]);
                }}
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
