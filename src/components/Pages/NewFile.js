import React, { useState } from "react";
import useAuth from "../../auth/use-auth";

/*
NEED TO REFACTOR 
FIX UPLOADFILETOLOCATION BRAH

*/
export default function NewFile({
  modalState,
  setModalState,
  location,
  folders
}) {
  const [selectedFolder, setSelectedFolder] = useState(location);
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [group, setGroup] = useState("");
  const { uploadSharedFile } = useAuth();

  if (!modalState) {
    return null;
  }

  const closeModal = () => {
    modalState = setModalState(!modalState);
  };
  return (
    <div className="modal is-active has-shadow">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head has-background-primary has-text-centered">
          <p className="modal-card-title has-text-white-ter">Upload file</p>
        </header>
        <section className="modal-card-body">
          <div className="content">
            <div class="field">
              <div class="control">
                <div class="select is-primary">
                  <select
                    value={selectedFolder}
                    onChange={e => setSelectedFolder(e.target.value)}
                  >
                    {folders.map((folder, index) => (
                      <option key={index} value={`Classes/${folder.name}`}>
                        {folder.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field-label is-pulled-left is-normal">
              <label className="label">Group:</label>
            </div>
            <div class="field">
              <div class="control">
                <input
                  className="input"
                  onChange={e => setGroup(e.target.value)}
                  type="text"
                  name="resume"
                />
              </div>
            </div>
            <div className="field-label is-pulled-left is-normal">
              <label className="label">Description:</label>
            </div>
            <div class="field">
              <div class="control">
                <input
                  className="input"
                  onChange={e => setDescription(e.target.value)}
                  type="text"
                  name="resume"
                />
              </div>
            </div>
            <label className="file-label">
              <input
                className="file-input"
                onChange={e => setFile(e.target.files[0])}
                type="file"
                name="resume"
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose a file…</span>
              </span>
            </label>
            <span className="file-name">{file.name}</span>
          </div>
        </section>
        <footer className="modal-card-foot">
          <input
            value="Press To Upload"
            disabled={file === ""}
            onClick={() => {
              uploadSharedFile(file, group, description);
            }}
            type="button"
            className="button is-success"
          />
          <a className="button is-danger is-pulled-right" onClick={closeModal}>
            Cancel
          </a>
        </footer>
      </div>
    </div>
  );
}
