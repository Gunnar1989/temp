import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function User({ groups, userInfo, img }) {
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    console.log(img);
  }
  return (
    <>
      <form>
        <div className="field">
          <div className="field-label is-pulled-left is-normal">
            <label className="label">Profile Picture:</label>
          </div>
          {img && (
            <div className="label-body">
              <div className="field">
                <div className="control">
                  <figure className="4x3">
                    <img className="profile" alt="Profile Picture" src={img} />
                  </figure>
                </div>
              </div>
            </div>
          )}
          {userInfo.map(response => (
            <>
              <div className="field-label is-pulled-left is-normal">
                <label className="label">Username:</label>
              </div>
              <div className="label-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      disabled
                      value={response.userName}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="field-label is-pulled-left is-normal">
                <label className="label">Email:</label>
              </div>
              <div className="label-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      disabled
                      value={response.email}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="field-label is-pulled-left is-normal">
                <label className="label">ID:</label>
              </div>
              <div className="label-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      disabled
                      value={response.userId}
                    ></input>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </form>
      <form>
        <div className="field-label is-pulled-left is-normal">
          <label className="label">Groups:</label>
        </div>
        <div className="label-body">
          <div className="field">
            <div className="control">
              <ul>
                {groups.map((resp, index) => (
                  <li key={index}>
                    <Link to={"editgroup/" + resp.Title} className="list-item">
                      {resp.Title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
