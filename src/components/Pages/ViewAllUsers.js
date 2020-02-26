import React, { useState, useEffect } from "react";
import useAuth from "../../auth/use-auth";
import User from "../Elements/User";

export default function ViewAllUsers() {
  const { getUser, getLoggedInUser, getUserGroups, getImage } = useAuth();
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [user, setUser] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    getUser().then(response => setUsers(response));
  }, []);

  async function selectUser(id) {
    const response = await getUserGroups(id);
    setGroups(response);
    const result = await getLoggedInUser(id);
    setUser(result);
    const img = await getImage(`profile_pictures/${result[0].userId}/`);
    setImage(img);
    console.log(result);
  }
  return (
    <div className="container">
      <h1 className="title">Users</h1>
      <div className="columns">
        <div className="column">
          <table className="table is-striped">
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Groups</th>
            </tr>
            <tbody>
              {users.map(user => (
                <tr>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>
                    <a
                      className="button is-primary"
                      onClick={() => {
                        selectUser(user.userId);
                      }}
                    >
                      Show
                    </a>
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="column">
          {user && <User groups={groups} userInfo={user} img={image} />}
        </div>
      </div>
    </div>
  );
}
