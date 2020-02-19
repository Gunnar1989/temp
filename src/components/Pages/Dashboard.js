import React, { useState, useEffect } from "react";
import useAuth from "../../auth/use-auth";
import * as ROUTES from "../util/Routing";
import Card from "../Elements/Card";

export default function DashBoard() {
  const {
    user,
    userAccess,
    getClassRoomImage,
    getImage,
    getClassRooms,
    isLoading
  } = useAuth();
  const [currentUser, setCurrentUser] = useState("");
  const [folders, setFolders] = useState([]);
  const [image, setImage] = useState("");
  const [imageDash, setImageDash] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      await getData();
      if (user == null) {
        setCurrentUser(await user);
      }
      console.log(userAccess);
      try {
        setImage(await getImage(`profile_pictures/${user.uid}/profile.jpg`));
      } catch (err) {
        setImage("https://pbs.twimg.com/media/B_YtPtIVAAEFj_g.jpg");
        console.log(err);
      }
    }
    fetchData();
  }, []);
  async function getData() {
    /* 
    FIX 
    */
    let temp = [];
    userAccess.forEach(element => {
      getClassRoomImage(element.filePath).then(async result => {
        temp.push(result);
      });
    });
    setTimeout(() => {
      setImageDash(temp);
    }, 700);
  }

  return (
    <section>
      <div className="container">
        <h1 className="title">Dashboard</h1>
        <div className="columns is-multiline">
          <Card
            path={ROUTES.EDIT_PROFILE.PATH}
            img={image}
            title={"Profile"}
            type={"Edit your profile"}
          />
          <Card
            path={ROUTES.VIEW_ALL_USERS.PATH}
            img={
              "http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/256/Files-icon.png"
            }
            title={"Edit Users"}
            type={"Admin"}
          />
          <Card
            path={ROUTES.VIEW_ALL_GROUPS.PATH}
            img={
              "http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/256/Files-icon.png"
            }
            title={"Edit Group"}
            type={"Admin"}
          />
          {userAccess.map((access, index) => (
            <Card
              path={"files/" + access.filePath}
              img={imageDash[index]}
              title={access.Title}
              type={"Classroom"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
