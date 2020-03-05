import React, { useState, useEffect } from "react";
import ModalCreateClassRoom from "./ModalCreateClassRoom";
import ModalEditGroup from "./ModalEditGroup";
import useAuth from "../../auth/use-auth";
import { Link } from "react-router-dom";
import EditGroup from "./EditGroup";
import SearchEngine from "../Elements/Search";
import * as HELPER from "../util/use";

export default function ViewAllGroups() {
  const { getGroups } = useAuth();
  const [modalActive, setModalActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState([]);
  const [modalGroupActive, setModalGroupActive] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectGroups, setSelectGroups] = useState([]);
  const [localGroup, setLocalGroup] = useState("");

  useEffect(() => {
    getGroups().then(response => {
      setGroups(response);
      setTimeout(async () => {
        setLoaded(true);
      }, 700);
    });
  }, []);
  const handleChange = (target, selectedgroup) => {
    if (target.checked) {
      setSelectGroups([...selectGroups, selectedgroup]);
    } else {
      setSelectGroups(HELPER.arrayRemove(selectGroups, selectedgroup));
    }
  };
  const manageUsers = group => {
    setLocalGroup(group);
    console.log(group);
    setModalGroupActive(!modalGroupActive);
  };
  const toggleActive = (i, e) => {
    if (e.target.checked) {
      setActive([...active, i]);
    } else {
      setActive(HELPER.arrayRemove(active, i));
    }
    console.log(i);
  };

  return (
    <div className="container">
      <h1 className="title">Classrooms</h1>
      <div className="columns">
        <div className="column">
          <table className="table is-striped">
            <tr>
              <th>Select</th>
              <th>Name</th>
            </tr>
            <tbody className="table-body">
              {groups.map((group, i) => (
                <tr
                  key={i}
                  onClick={e => toggleActive(i, e)}
                  className={active.includes(i) ? "selected" : ""}
                >
                  <td className="has-text-centered">
                    <input
                      type="checkbox"
                      onClick={e => handleChange(e.target, group)}
                    />
                  </td>
                  <td>
                    <Link className="is-size-6" to={`editgroup/${group.Title}`}>
                      <b>{group.Title}</b>
                    </Link>
                    <br />
                    <a onClick={() => manageUsers(group)}>Manage Users </a>
                    <Link to={`files/${group.filePath}`}>Fileshare</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loaded && <SearchEngine groups={groups} setGroups={setGroups} />}
          <div className="column">
            <a onClick={() => setModalActive(!modalActive)}>
              Create Class Room
            </a>

            {modalActive && (
              <ModalCreateClassRoom
                modalState={modalActive}
                setModalState={setModalActive}
              />
            )}
            {modalGroupActive && (
              <ModalEditGroup
                localGroup={localGroup}
                modalGroupActive={modalGroupActive}
                setModalGroupActive={setModalGroupActive}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
