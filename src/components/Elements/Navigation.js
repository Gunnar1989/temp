import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../util/Routing";

const Navigation = () => (
  <>
    <ul class="menu-list">
      <li class="menu-label is-hidden-touch">
        Menu
        <ul>
          <li>
            <Link className="" to={ROUTES.HOME.PATH}>
              {ROUTES.DASHBOARD.NAME}
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  </>
);

export default Navigation;
