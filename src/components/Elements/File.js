import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../auth/use-auth";

export default function File({ selectedFile }) {
  const { changeMetadata } = useAuth();
  const access = selectedFile.data.customMetadata.access.split(",");
  const [group, setGroup] = useState("");

  const grantAccess = () => {
    var arrayGroup = ["Math", "Science"];
    changeMetadata(arrayGroup, selectedFile);
  };
  return (
    <>
      <div className="message-header has-background-primary">
        <p>Edit file</p>
      </div>
      <div className="field-label is-pulled-left is-normal">
        <label className="label">Filename:</label>
      </div>
      <div className="label-body">
        <div className="field">
          <div className="control">
            <input type="text" value={selectedFile.data.name} />
          </div>
        </div>
      </div>
      <div className="field-label is-pulled-left is-normal">
        <label className="label">Size:</label>
      </div>
      <div className="label-body">
        <div className="field">
          <div className="control">
            <p>{selectedFile.data.size / 1000000} mb</p>
          </div>
        </div>
      </div>
      <div className="field-label is-pulled-left is-normal">
        <label className="label">Data Created:</label>
      </div>
      <div className="label-body">
        <div className="field">
          <div className="control">
            <p>{selectedFile.data.timeCreated}</p>
          </div>
        </div>
      </div>
      <div className="field-label is-pulled-left is-normal">
        <label className="label">Access:</label>
      </div>
      <div className="label-body">
        <div className="field">
          <div className="control">
            {access.map(link => (
              <Link to={"editgroup/" + link} className="list-item">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <input
        className="input"
        placeholder="Name Of Group"
        type="text"
        onChange={e => setGroup(e.target.value)}
      />
      <input
        className="button"
        type="button"
        value="Edit File"
        onClick={() => grantAccess()}
      />
    </>
  );
}
