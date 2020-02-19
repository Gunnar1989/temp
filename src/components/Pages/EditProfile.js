import React, { useEffect, useState } from "react";
import useAuth from "../../auth/use-auth";
import { Link } from "react-router-dom";
import ImageUpload from "../Elements/ImageUpload";

export default function EditProfile() {
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [groups, setGroups] = useState([]);
  const [image, setImage] = useState("");
  const { user, getLoggedInUser, userAccess, getImage } = useAuth();
  useEffect(() => {
    async function fetchData() {
      const response = await getLoggedInUser(user.uid);
      const img = await getImage(
        `profile_pictures/${user.uid}/
        profile.jpg`
      );
      setImage(img);
      setLoggedInUser(response[0]);
      setGroups(response[1]);
    }
    fetchData();
  }, []);
  return (
    <section>
      <div className="container">
        <h1 className="title">Edit profile for: {loggedInUser.userName}</h1>
        <h2 className="subtitle">
          A simple container to divide your page into <strong>sections</strong>,
          like the one you're currently reading
        </h2>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={loggedInUser.userName}
            />
          </div>
        </div>
        <ImageUpload
          image={image}
          setImage={setImage}
          path={`profile_pictures/${user.uid}/`}
          type="profile.jpg"
        />
        <img alt="Profile" src={image} width="100px" heigh="300px" />
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" value={loggedInUser.email} />
          </div>
        </div>
        <label className="label">Groups</label>
        <div className="list is-hoverable">
          {userAccess.map(group => (
            <div>
              <Link to={"editgroup/" + group.Title} className="list-item">
                {group.Title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
