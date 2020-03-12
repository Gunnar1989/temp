import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../auth/use-auth";
import NewFile from "./NewFile";
import File from "../Elements/File";
import * as HELPER from "../util/use";
import ArrowDown from "../../static/img/arrow-down.js";

export default function Files() {
  const [modalActive, setModalActive] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filesActive, setFilesActive] = useState(true);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectFiles, setSelectFiles] = useState("");
  const [storagePath, setStoragePath] = useState("");
  const [currentSort, setCurrentSort] = useState({
    class: "arrow-up",
    fn: (a, b) => b.data.size - a.data.size
  });
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
  const sortTypes = {
    up: {
      class: "sort-up",
      fn: (a, b) => a.data.size - b.data.size
    },
    down: {
      class: "sort-down",
      fn: (a, b) => b.data.size - a.data.size
    },
    default: {
      class: "sort",
      fn: (a, b) => a
    }
  };
  const onSortChange = () => {
    if (currentSort === false) {
      setCurrentSort({
        up: {
          class: "sort-up",
          fn: (a, b) => a.data.size - b.data.size
        }
      });
    } else
      setCurrentSort({
        down: {
          class: "sort-down",
          fn: (a, b) => b.data.size - a.data.size
        }
      });
  };

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
      setLoading(false);
    }, 700);
  };
  const handleChange = (target, file) => {
    if (target.checked) {
      setSelectFiles([...selectFiles, file]);
    } else {
      setSelectFiles(HELPER.arrayRemove(selectFiles, file));
    }
  };
  const formatTimeStamp = time => {
    return time.slice(0, -14);
  };
  const editFile = async file => {
    setSelectedFile(file[0]);
  };
  const sortTable = () => {
    console.log([currentSort]);
    return [currentSort].fn;
  };

  return (
    <section>
      <div className="container">
        <h1 className="title">Files for {storagePath}</h1>
        <div className="columns">
          <div className="column is-9">
            <table className="table is-bordered has-background-white-bis is-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    Name
                    <span className="is-pulled-right">
                      <ArrowDown />
                    </span>
                  </th>
                  <th>Description</th>
                  <th>
                    Created
                    <span className="is-pulled-right">
                      <ArrowDown />
                    </span>
                  </th>
                  <th>
                    Size
                    <span className="is-pulled-right">
                      <ArrowDown />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  files.sort(sortTable()).map((file, index) => (
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          onClick={e => handleChange(e.target, file)}
                        />
                      </td>
                      <td>
                        <a target="_blank" href={file.url}>
                          {file.itemRef.name}
                        </a>
                      </td>
                      <td className="has-text-centered">
                        <p>{file.data.customMetadata.description}</p>
                      </td>
                      <td className="has-text-centered">
                        <p>{formatTimeStamp(file.data.timeCreated)}</p>
                      </td>
                      <td className="has-text-centered">
                        <p>{HELPER.bytesToMegabyte(file.data.size)} mb</p>
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
          </div>
          <div className="column is-3">
            <div class="columns is-multiline">
              <div className="column is-full">
                <div className="menu has-background-white-bis">
                  <div className="message-header has-background-primary">
                    <p>Admin</p>
                    <span onClick={() => setShowAdmin(!showAdmin)}>
                      <ArrowDown />
                    </span>
                  </div>
                  <ul
                    className={showAdmin ? "menu-list" : "menu-list is-hidden"}
                  >
                    <li>
                      <a onClick={() => setModalActive(!modalActive)}>
                        Upload File
                      </a>
                    </li>
                    <li>
                      <a onClick={() => editFile(selectFiles)}>Edit File</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="column is-full">
                <div className="menu has-background-white-bis">
                  <div className="message-header has-background-primary">
                    <p>File Type</p>
                    <span onClick={() => setShowFilters(!showFilters)}>
                      <ArrowDown />
                    </span>
                  </div>
                  <ul
                    className={
                      showFilters ? "menu-list" : "menu-list is-hidden"
                    }
                  >
                    <li>
                      <label class="checkbox">
                        <input type="checkbox" />
                        PDF
                      </label>
                    </li>
                    <li>
                      <label class="checkbox">
                        <input type="checkbox" />
                        AUDIO
                      </label>
                    </li>
                    <li>
                      <label class="checkbox">
                        <input type="checkbox" />
                        VIDEO
                      </label>
                    </li>
                    <li>
                      <label class="checkbox">
                        <input type="checkbox" />
                        WORD
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          className="button"
          type="button"
          value="Download Selected Files"
          onClick={() => downloadMulti(selectFiles)}
        />
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
