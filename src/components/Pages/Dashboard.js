import React, { useState, useEffect } from "react";
import useAuth from "../../auth/use-auth";
import * as ROUTES from "../util/Routing";
import { Link } from "react-router-dom";

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
        <div className="tile is-ancestor">
          <div className="tile is-parent is-vertical">
            <Link to={ROUTES.EDIT_PROFILE.PATH}>
              <article className="tile has-background-primary is-child box">
                <h1 className="title has-text-centered has-text-white-ter">
                  Profile
                </h1>
                <figure className="image is-4by3">
                  <img alt="Profile" loading="lazy" src={image}></img>
                </figure>
                <hr />
                <p className="subtitle has-text-centered has-text-white-ter">
                  Edit your profile
                </p>
              </article>
            </Link>
          </div>

          {userAccess.map((access, index) => (
            <div className="tile is-parent is-vertical">
              <Link to={"files/" + access.filePath}>
                <article className="tile has-background-primary is-child box">
                  <h1 className="title has-text-centered has-text-white-ter">
                    {access.Title}
                  </h1>
                  <figure className="image is-4by3">
                    {!isLoading ? (
                      <img alt={access.Title} src={imageDash[index]} />
                    ) : (
                      <p>waiting</p>
                    )}
                  </figure>
                  <hr />
                  <p className="subtitle has-text-centered has-text-white-ter">
                    Class Room
                  </p>
                </article>
              </Link>
            </div>
          ))}
          <div className="tile is-parent is-vertical">
            <Link to={ROUTES.VIEW_ALL_USERS.PATH}>
              <article className="tile has-background-primary is-child box">
                <h1 className="title has-text-centered has-text-white-ter">
                  Edit Users
                </h1>
                <figure className="image is-4by3">
                  <img src="http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/256/Files-icon.png"></img>
                </figure>
                <hr />
                <p className="subtitle has-text-centered has-text-white-ter">
                  Admin
                </p>
              </article>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
