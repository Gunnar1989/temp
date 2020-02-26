import React, { useState, useEffect } from "react";
import CreateClassRoom from "./CreateClassRoom";
import useAuth from "../../auth/use-auth";
import { Link } from "react-router-dom";

export default function ViewAllGroups() {
  const { getGroups } = useAuth();
  const [modalActive, setModalActive] = useState(false);
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getGroups().then(response => setGroups(response));
  }, []);

  return (
    <div className="container">
      <h1 className="title">Classrooms</h1>
      <div className="columns">
        <div className="column">
          <table className="table is-striped">
            <tr>
              <th>Name</th>
              <th>Fileshare</th>
            </tr>
            <tbody>
              {groups.map(group => (
                <tr>
                  <td>
                    <Link to={`editgroup/${group.Title}`}>{group.Title}</Link>
                  </td>
                  <td>
                    <Link to={`files/${group.filePath}`}>{group.filePath}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="column">
            <a onClick={() => setModalActive(!modalActive)}>
              Create Class Room
            </a>

            {modalActive && (
              <CreateClassRoom
                modalState={modalActive}
                setModalState={setModalActive}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
