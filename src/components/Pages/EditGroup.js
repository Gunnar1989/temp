import React, { useEffect, useState } from "react";
import useAuth from "../../auth/use-auth";
import AddUserToGroup from "./AddUserToGroup";
import { useParams, Link } from "react-router-dom";

export default function EditGroup() {
  const [groups, setGroups] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [owner, setOwner] = useState("");
  const [members, setMembers] = useState([]);
  const { getLoggedInUser, getGroupInfo } = useAuth();
  let { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const groupInfo = await getGroupInfo(id);
      setGroups(groupInfo);
      const ownerInfo = await getLoggedInUser(groupInfo.owner[0]); //Fix
      setOwner(ownerInfo[0]);
      const memberInfo = await populate(groupInfo.member);
      setTimeout(() => {
        setMembers(memberInfo);
      }, 700);
    }
    fetchData();
  }, []);

  const populate = async memberInfo => {
    let localArray = [];
    memberInfo.forEach(async member => {
      const localMember = await getLoggedInUser(member);
      localArray.push(localMember[0]);
    });
    return localArray;
  };

  return (
    <section>
      <div className="container">
        <h1 className="title">Class Room {groups.Title}</h1>
        <h2 className="subtitle">
          Owner: {owner.userName}
          <Link to={"files/" + groups.filePath}>Files</Link>
        </h2>
        <div className="columns">
          <div className="column">
            <table className="table is-striped">
              <tr>
                <th>User Name</th>
              </tr>
              <tbody>
                {members.map(member => (
                  <tr>
                    <td>{member.userName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {modalActive && (
            <AddUserToGroup
              modalState={modalActive}
              setModalState={setModalActive}
              groups={groups}
            />
          )}
          <div className="column">
            <a onClick={() => setModalActive(!modalActive)}>Add User</a>
          </div>
        </div>
      </div>
    </section>
  );
}
