import React, { useState, useEffect } from "react";
import useAuth from "../../auth/use-auth";
import User from "../Elements/User";
import * as HELPER from "../util/use";

export default function ViewAllUsers() {
  const { getUser, getLoggedInUser, getUserGroups, getImage } = useAuth();
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [groups, setGroups] = useState([]);
  const [user, setUser] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    getUser().then(response => setUsers(response));
  }, []);
  const handleChange = (target, selectedgroup) => {
    if (target.checked) {
      setSelectedUser([...selectedUser, selectedgroup]);
    } else {
      setSelectedUser(HELPER.arrayRemove(selectedUser, selectedgroup));
    }
  };
  async function selectUser(id) {
    const response = await getUserGroups(id);
    setGroups(response);
    const result = await getLoggedInUser(id);
    setUser(result);
    const img = await getImage(`profile_pictures/${result[0].userId}/`);
    setImage(img);
    console.log(result);
  }
  const toggleActive = (i, e) => {
    if (e.target.checked) {
      setActive([...active, i]);
    } else {
      setActive(HELPER.arrayRemove(active, i));
    }
    console.log(i);
  };
  return (
    <section>
      <div className="container">
        <h1 className="title">Users</h1>
        <div className="">
          <table className="table is-bordered is-fullwidth">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
            </tr>
            <tbody className="table-body">
              {users.map((user, i) => (
                <tr
                  key={i}
                  onClick={e => toggleActive(i, e)}
                  className={active.includes(i) ? "selected" : ""}
                >
                  <td className="has-text-centered">
                    <input
                      type="checkbox"
                      onClick={e => handleChange(e.target, user)}
                    />
                  </td>
                  <td>
                    <p className="">{user.userName}</p>
                    <a
                      className="menu-label"
                      onClick={() => {
                        selectUser(user.userId);
                      }}
                    >
                      View User
                    </a>
                    -
                  </td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {user && <User groups={groups} userInfo={user} img={image} />}
      </div>
    </section>
  );
}
