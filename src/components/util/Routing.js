import DashBoard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import ViewAllusers from "../Pages/ViewAllUsers";
import EditProfile from "../Pages/EditProfile";
import ViewAllGroups from "../Pages/ViewAllGroups";
import EditGroup from "../Pages/EditGroup";
import Files from "../Pages/Files";

export const HOME = {
  PATH: "/",
  NAME: "Home",
  COMPONENT: Home
};
export const DASHBOARD = {
  PATH: "/dashboard",
  NAME: "Dashboard",
  COMPONENT: DashBoard
};
export const ACCOUNT = {
  PATH: "/dashboard",
  NAME: "Account",
  COMPONENT: DashBoard
};
export const VIEW_ALL_USERS = {
  PATH: "/viewalluser",
  NAME: "All Users",
  COMPONENT: ViewAllusers
};
export const EDIT_PROFILE = {
  PATH: "/editprofile",
  NAME: "Edit Profile",
  COMPONENT: EditProfile
};
export const VIEW_ALL_GROUPS = {
  PATH: "/viewallgroups",
  NAME: "Manage Classes",
  COMPONENT: ViewAllGroups
};
export const EDIT_GROUP = {
  PATH: "/:id",
  NAME: "Edit Group",
  COMPONENT: EditGroup
};
export const FILES = {
  PATH: "/files/:classRoom",
  NAME: "Files",
  COMPONENT: Files
};
