import React, { useState, useEffect } from "react";
import useAuth from "../../auth/use-auth";
import * as HELPER from "../util/use";
import ImageUpload from "../Elements/ImageUpload";

/*
NEED TO REFACTOR 
FIX UPLOADFILETOLOCATION BRAH
*/
export default function CreateClassRoom({ modalState, setModalState }) {
  const { getAllUsers, createUserGroup } = useAuth();
  const [classroomName, setClassroomName] = useState("");
  const [classroomPath, setClassroomPath] = useState("");
  const [owner, setOwner] = useState([]);
  const [member, setMember] = useState([]);
  const [classroomImage, setClassroomImage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const tempUsers = await getAllUsers();
      setTimeout(() => {
        setUsers(tempUsers);
      }, 700);
    }
    fetchData();
  }, []);

  if (!modalState) {
    return null;
  }
  function handleChange(e) {
    if (e.target.checked) {
      setMember([...member, e.target.value]);
    } else {
      setMember(HELPER.arrayRemove(member, e.target.value));
    }
  }
  function handleChangeOwner(e) {
    if (e.target.checked) {
      setOwner([...owner, e.target.value]);
    } else {
      setOwner(HELPER.arrayRemove(owner, e.target.value));
    }
  }
  const createGroup = () => {
    let userGroup = {
      owner: owner,
      member: member,
      filePath: classroomPath,
      Title: classroomName
    };
    createUserGroup(userGroup);
  };
  const closeModal = () => {
    modalState = setModalState(!modalState);
  };
  return (
    <div className="modal is-active has-shadow">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head has-background-primary has-text-centered">
          <p className="modal-card-title has-text-white-ter">
            Create Class Room
          </p>
        </header>
        <section className="modal-card-body">
          <div className="content">
            <div className="field-label is-pulled-left is-normal">
              <label className="label">Class room Name:</label>
            </div>
            <div className="label-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    placeholder="Science?"
                    type="text"
                    onChange={e => setClassroomName(e.target.value)}
                  ></input>
                </div>
                <div className="field-label is-pulled-left is-normal">
                  <label className="label">Class room Path:</label>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      placeholder="/storage/location"
                      type="text"
                      onChange={e => setClassroomPath(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="field-label is-pulled-left is-normal">
                  <label className="label">Image:</label>
                </div>
                <div className="field">
                  <div className="control">
                    <ImageUpload
                      image={classroomImage}
                      setImage={setClassroomImage}
                      path={classroomPath}
                      type="classroom.jpg"
                    />
                  </div>
                </div>
                <div className="field-label is-pulled-left is-normal">
                  <label className="label">Owner:</label>
                </div>
                {users.map((user, index) => (
                  <>
                    <br />
                    <label class="checkbox">
                      <input
                        onChange={e => handleChangeOwner(e)}
                        type="checkbox"
                        key={index}
                        value={user.userId}
                      />
                      {user.userName}
                    </label>
                  </>
                ))}
                <div className="field-label is-pulled-left is-normal">
                  <label className="label">Members:</label>
                </div>
                {users.map((user, index) => (
                  <>
                    <br />
                    <label class="checkbox">
                      <input
                        onChange={e => handleChange(e)}
                        type="checkbox"
                        key={index}
                        value={user.userId}
                      />
                      {user.userName}
                    </label>
                  </>
                ))}
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <input type="button" value="Create" onClick={() => createGroup()} />
          <a className="button is-danger is-pulled-right" onClick={closeModal}>
            Cancel
          </a>
        </footer>
      </div>
    </div>
  );
}
