import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../auth/use-auth";
import NewFile from "./NewFile";
import File from "../Elements/File";
import * as HELPER from "../util/use";

export default function Files() {
  const [modalActive, setModalActive] = useState(false);
  const [foldersActive, setFoldersActive] = useState(true);
  const [filesActive, setFilesActive] = useState(true);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectFiles, setSelectFiles] = useState([]);
  const [storagePath, setStoragePath] = useState("");
  const {
    getClassRooms,
    getFiles,
    userAccess,
    getFilesAccess,
    downloadMulti,
    isLoading
  } = useAuth();
  let { path } = useParams();

  useEffect(() => {
    async function fetch() {
      //await getClassRoomData();
      await getFileAccessData();
      //await getFilesFromFolder();
      await filesLoaded();
    }
    fetch();
  }, []);

  const getData = async () => {
    //await getClassRoomData();
    await getFileAccessData();
    //await getFilesFromFolder();
    await filesLoaded();
  };
  const filesLoaded = async () => {
    setFilesActive(true);
  };
  const getStoragePathData = async () => {
    setStoragePath(path);
  };
  const getClassRoomData = async () => {
    getClassRooms("Classes/").then(async result => {
      setFolders(result);
      HELPER.arrayRemove(folders, storagePath);
    });
  };
  const getFileAccessData = async () => {
    getFilesAccess(path).then(result => {
      populateFiles(result);
      console.log(result);
    });
  };
  const getFilesFromFolder = async () => {
    getFiles("Classes/" + storagePath).then(result => {
      populateFiles(result);
    });
  };
  const populateFiles = async result => {
    setStoragePath(path);
    setTimeout(async () => {
      setFiles(result);
    }, 700);
  };
  const handleChange = (target, file) => {
    if (target.checked) {
      setSelectFiles([...selectFiles, file]);
    } else {
      setSelectFiles(HELPER.arrayRemove(selectFiles, file));
    }
  };
  const editFile = async file => {
    setSelectedFile(file[0]);
  };
  return (
    <section>
      <div className="container">
        <h1 className="title">Files for {storagePath}</h1>
        <div className="columns">
          <div className="column is-3 ">
            <div className="menu has-background-white-bis">
              <div className="message-header has-background-primary">
                <p>Filters</p>
              </div>
              <p className="menu-label">Location: </p>
              <ul className="menu-list">
                <li>
                  <p>{storagePath}</p>
                </li>
              </ul>
              <p className="menu-label">Other Class Rooms:</p>
              <ul className="menu-list">
                {userAccess.map((access, index) => (
                  <li key={index}>
                    <a onClick={() => getData(access.filePath)}>
                      {access.Title}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="menu-label">Show</p>
              <ul className="menu-list">
                <li>
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    onChange={() => {
                      setFilesActive(!filesActive);
                    }}
                    name="answer"
                  />
                  Files
                </li>
                <li>
                  <input
                    type="checkbox"
                    defaultChecked
                    onChange={() => {
                      setFoldersActive(!foldersActive);
                    }}
                    name="answer"
                  />
                  Folders
                </li>
              </ul>
              <p className="menu-label">File Types</p>
              <ul className="menu-list">
                <li>PDF</li>
              </ul>
            </div>
            <div className="menu has-background-white-bis">
              <div className="message-header has-background-primary">
                <p>Admin</p>
              </div>
              <ul className="menu-list">
                <li>
                  <a onClick={() => setModalActive(!modalActive)}>
                    Upload File
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="column is-9">
            <table className="table is-bordered has-background-white-bis is-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Select</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading ? (
                  files.map((file, index) => (
                    <tr>
                      <td>
                        <img
                          alt="file"
                          src="https://img.icons8.com/pastel-glyph/22/000000/file.png"
                        />
                      </td>
                      <td>
                        <a target="_blank" href={file.url}>
                          {file.itemRef.name}
                        </a>
                      </td>
                      <td className="has-text-centered">
                        <input
                          type="checkbox"
                          onClick={e => handleChange(e.target, file)}
                        />
                      </td>
                      <td className="has-text-centered">
                        <p>{file.data.customMetadata.description}</p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <p>loading</p>
                  </>
                )}
              </tbody>
            </table>
            <input
              className="button"
              type="button"
              value="Download Selected Files"
              onClick={() => downloadMulti(selectFiles)}
            />
            <input
              className="button"
              type="button"
              value="Edit File"
              onClick={() => editFile(selectFiles)}
            />
          </div>
        </div>
        <div className="column">
          {selectedFile != "" && <File selectedFile={selectedFile} />}
        </div>
      </div>
      {modalActive && (
        <NewFile
          modalState={modalActive}
          folders={folders}
          setModalState={setModalActive}
          location={storagePath}
        />
      )}
    </section>
  );
}
