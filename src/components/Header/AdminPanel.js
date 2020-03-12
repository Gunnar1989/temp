import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../util/Routing";
import useAuth from "../../auth/use-auth";

const AdminPanel = () => {
  const { userAccess } = useAuth();
  return (
    <>
      <ul class="menu-list">
        <li class="menu-label is-hidden-touch">
          Admin
          <ul>
            <li>
              <Link To={ROUTES.VIEW_ALL_GROUPS.PATH}>
                {ROUTES.VIEW_ALL_GROUPS.NAME}
              </Link>
            </li>
            <li>
              <Link To={ROUTES.VIEW_ALL_USERS.PATH}>
                {ROUTES.VIEW_ALL_USERS.NAME}
              </Link>
            </li>
            <li>
              <Link To={ROUTES.VIEW_ALL_USERS.PATH}>Manage Licences</Link>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
};

export default AdminPanel;
