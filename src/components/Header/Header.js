import React, { useState } from "react";
import HeaderLogin from "./HeaderLogin";
import AdminPanel from "./AdminPanel";
import { withRouter } from "react-router-dom";
import Navigation from "../Elements/Navigation";
import MyClassRooms from "./MyClassRooms";

function Header() {
  return (
    <aside class="column has-background-danger is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <HeaderLogin />
      <Navigation />
      <MyClassRooms />
      <AdminPanel />
    </aside>
  );
}
export default withRouter(Header);
