import React, { useState, useEffect } from "react";
import useAuth from "../../auth/use-auth";
import * as HELPER from "../util/use";
/*
NEED TO REFACTOR 
*/

export default function AddUserToGroup({ modalState, setModalState, groups }) {
  const { addUserToGroup, getAllUsers, removeUserFromGroup } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

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

  async function addMember() {
    selectedUsers.forEach(async user => {
      await addUserToGroup(groups.Title, user);
    });
    closeModal();
  }
  async function removeMember() {
    selectedUsers.forEach(async user => {
      await removeUserFromGroup(groups.Title, user);
    });
    closeModal();
  }
  const closeModal = () => {
    modalState = setModalState(!modalState);
  };
  function handleChange(e) {
    if (e.target.checked) {
      setSelectedUsers([...selectedUsers, e.target.value]);
    } else {
      setSelectedUsers(HELPER.arrayRemove(selectedUsers, e.target.value));
    }
    console.log(selectedUsers);
  }
  return (
    <div className="modal is-active has-shadow">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head has-background-primary has-text-centered">
          <p className="modal-card-title has-text-white-ter">
            Add User to {groups.Title}
          </p>
        </header>
        <section className="modal-card-body">
          <div className="content">
            <div class="field">
              <div class="control">
                <div className="column">
                  <div class="field has-addons">
                    <div class="select is-multiple">
                      {users.map((user, index) => (
                        <>
                          <label class="checkbox">
                            <input
                              onChange={e => handleChange(e)}
                              type="checkbox"
                              key={index}
                              value={user.userId}
                            />
                            {user.userName}
                          </label>
                          <br />
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <input type="button" onClick={() => addMember()} value="Add" />
          <input type="button" onClick={() => removeMember()} value="Remove" />
          <a className="button is-danger is-pulled-right" onClick={closeModal}>
            Cancel
          </a>
        </footer>
      </div>
    </div>
  );
}
