import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../util/Routing";
import useAuth from "../../auth/use-auth";

const MyClassRooms = () => {
  const { userAccess } = useAuth();
  return (
    <>
      <ul class="menu-list">
        <li class="menu-label is-hidden-touch">
          My Class Rooms
          <ul>
            {userAccess.map((access, index) => (
              <li key={index}>
                <a>{access.Title}</a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
};

export default MyClassRooms;
