import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import "firebase/database";
import * as HELPER from "../components/util/use";
import FullPageLoading from "../components/Elements/Loading";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

AuthProvider.actions = {
  setUser: "SET_USER",
  toggleLoading: "TOGGLE_LOADING"
};

const reducer = (state, action) => {
  switch (action.type) {
    case AuthProvider.actions.setUser:
      return {
        user: action.payload.user,
        userAccess: action.payload.userAccess,
        isInitiallyLoading: false,
        isLoading: false,
        progress: 0,
        users: {},
        isLoggedIn: []
      };
    case AuthProvider.actions.toggleLoading:
      return {
        ...state,
        isLoading: action.payload.value
      };
    default:
      throw new Error(`No case for type ${action.type} found.`);
  }
};

const AuthContext = React.createContext(undefined);

export function AuthProvider({ initialUser, children }) {
  const [userAccess, setUserAccess] = useState([]);
  const [state, dispatch] = React.useReducer(reducer, {
    isInitiallyLoading: true,
    isLoading: false,
    user: null,
    userAccess: [],
    isLoggedIn: [],
    progress: 0 // delete
  });

  const signingInSoDontDispatchOnAuthStateChange = React.useRef(false);
  React.useEffect(() => {
    // Setup Firebase authentication state observer and get user data.
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    let callback = null;
    let metadataRef = null;
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        // User is signed in.
        metadataRef = firebase
          .database()
          .ref("metadata/" + user.uid + "/refreshTime");
        callback = snapshot => {
          console.log(snapshot);
          user.getIdToken(true);
        };
        const access = await getUserAccess(user);
        setUserAccess(access);
        metadataRef.on("value", callback);
        if (signingInSoDontDispatchOnAuthStateChange.current) {
          signingInSoDontDispatchOnAuthStateChange.current = false;
          return;
        }
        dispatch({
          type: AuthProvider.actions.setUser,
          payload: {
            user,
            userAccess
          }
        });
      } else {
        // User is signed out.
        dispatch({
          type: AuthProvider.actions.setUser,
          payload: {
            user: null,
            userAccess: []
          }
        });
      }
    });
  }, []);
  const getUserAccess = async user => {
    const db = firebase.firestore();
    let localAccess = [];
    let groupsRef = db.collection("classrooms");
    await groupsRef
      .where("member", "array-contains", user.uid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        snapshot.forEach(doc => localAccess.push(doc.data()));
      });
    return localAccess;
  };
  const removeUserFromGroup = async (group, id) => {
    let local = [];
    let docId = "";
    const db = firebase.firestore();
    await db
      .collection("classrooms")
      .where("Title", "==", group)
      .get()
      .then(async snapshot => {
        docId = snapshot.docs[0].id;
        snapshot.forEach(async doc => local.push(await doc.data().member));
      });

    db.collection("classrooms")
      .doc(docId)
      .update({
        member: HELPER.arrayRemove(local[0], id)
      });
  };
  const createUserGroup = async group => {
    let data = {
      Title: group.Title,
      filePath: group.filePath,
      member: group.member,
      owner: group.owner
    };
    console.log("?????");
    console.log(data);
    const db = firebase.firestore();
    db.collection("classrooms")
      .doc()
      .set(data);
  };
  const addUserToGroup = async (group, id) => {
    let local = [];
    let docId = "";
    const db = firebase.firestore();
    await db
      .collection("classrooms")
      .where("Title", "==", group)
      .get()
      .then(async snapshot => {
        docId = snapshot.docs[0].id;
        snapshot.forEach(async doc => local.push(await doc.data().member));
      })
      .then(() => {
        local[0].push(id);
      });
    console.log(local);
    db.collection("classrooms")
      .doc(docId)
      .update({
        member: local[0]
      });
  };
  const getUserGroups = async id => {
    const db = firebase.firestore();
    let group = [];
    let groupsRef = db.collection("classrooms");
    await groupsRef
      .where("member", "array-contains", id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        snapshot.forEach(doc => group.push(doc.data()));
      })
      .catch(err => {
        console.log("Error finding user", err);
        return;
      });
    return await group;
  };
  const getAllUsers = () => {
    const db = firebase.firestore();
    let group = [];
    let users = db.collection("users");
    users.get().then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach(doc => group.push(doc.data()));
    });
    return group;
  };
  const getGroupInfo = async title => {
    const db = firebase.firestore();
    let group = [];
    let groupsRef = db.collection("classrooms");
    await groupsRef
      .where("Title", "==", title)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        snapshot.forEach(doc => group.push(doc.data()));
      })
      .catch(err => {
        console.log("Error finding user", err);
        return;
      });
    return await group[0];
  };
  const getLoggedInUser = async id => {
    const db = firebase.firestore();
    let cUser = [];
    console.log(id);
    let usersRef = db.collection("users");
    await usersRef
      .where("userId", "==", id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        snapshot.forEach(doc => cUser.push(doc.data()));
      })
      .catch(err => {
        console.log("Error finding user", err);
        return;
      });
    return cUser;
  };
  const getUser = async () => {
    const db = firebase.firestore();
    let usersRef = db.collection("users");
    let groupsRef = db.collection("groups");
    let groups = [];
    await groupsRef
      .where("Name", "==", "Class Of 2020")
      .get()
      .then(snapshot =>
        snapshot.forEach(doc => {
          groups.push({ ...doc.data() });
        })
      );
    let users = [];
    await usersRef
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        snapshot.forEach(doc => {
          users.push({
            groups,
            ...doc.data()
          });
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
        return;
      });

    return users;
  };
  const downloadFile = async (ref, file) => {
    const storage = firebase.storage();
    let res = "";
    console.log(file);
    await storage
      .ref(ref)
      .child(file)
      .getDownloadURL()
      .then(url => {
        res = url;
      });
    return res;
  };

  const uploadFile = (path, file) => {
    const storage = firebase.storage();
    console.log(path);
    var metadata = {
      contentType: "image/jpeg"
    };
    const uploadTask = storage.ref(`${path}/${file.name}`).put(file, metadata);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        console.log(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      error => {
        // Error function ...
        console.log(error);
      }
    );
  };
  const uploadSharedFile = (file, classroom) => {
    const storage = firebase.storage();
    var metadata = {
      customMetadata: {
        access: classroom
      }
    };
    const uploadTask = storage.ref(`shared/${file.name}`).put(file, metadata);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        console.log(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      error => {
        // Error function ...
        console.log(error);
      }
    );
  };

  const getGroups = async id => {
    const db = firebase.firestore();
    let usersRef = db.collection("groups");
    let users = [];
    await usersRef
      .where("userName", "==", id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        snapshot.forEach(doc => {
          users.push({
            ...doc.data()
          });
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
        return;
      });

    return users;
  };

  const uploadImage = (image, path, type) => {
    const storage = firebase.storage();
    var metadata = {
      contentType: "image/jpeg"
    };
    const uploadTask = storage
      .ref(`Classes/${path}/${type}`)
      .put(image, metadata);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        console.log(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      error => {
        console.log(error);
      }
      //getImage(`profile_pictures/${state.user.uid}/`, image.name)
    );
  };
  const uploadFileToLocation = (file, location) => {
    const storage = firebase.storage();
    var metadata = {
      contentType: "image/jpeg"
    };
    const uploadTask = storage
      .ref(`${location}/${file.name}`)
      .put(file, metadata);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        console.log(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      error => {
        console.log(error);
      }
    );
  };

  const getImage = async ref => {
    const storage = firebase.storage();
    let res = "Changeme";
    console.log(ref);
    await storage
      .ref(ref)
      .child("profile.jpg")
      .getDownloadURL()
      .then(url => {
        res = url;
      })
      .catch(
        () =>
          (res = "https://avatars2.githubusercontent.com/u/7221389?s=300&v=4") //change to default avatar
      );
    return res;
  };
  const getClassRoomImage = async ref => {
    const storage = firebase.storage();
    let res = "Changeme";
    await storage
      .ref("Classes/" + ref)
      .child("classroom.jpg")
      .getDownloadURL()
      .then(url => {
        res = url;
      })
      .then(() => {
        console.log(res);
      });
    return res;
  };
  const getFilesAccess = async ref => {
    const storage = firebase.storage();
    let result = [];
    console.log("hello");
    await storage
      .ref("shared/")
      .listAll()
      .then(function(res) {
        res.items.forEach(async function(itemRef) {
          await itemRef.getDownloadURL().then(async url => {
            await itemRef.getMetadata().then(async data => {
              if (data.customMetadata.access === "Math") {
                result.push({ itemRef, url, data });
              }
            });
          });
        });
      });
    return result;
  };
  const getFiles = async ref => {
    toggleLoading(true);
    const storage = firebase.storage();
    let result = [];
    await storage
      .ref(ref)
      .listAll()
      .then(function(res) {
        res.items.forEach(function(itemRef) {
          itemRef.getDownloadURL().then(url => {
            itemRef.getMetadata().then(data => {
              result.push({ itemRef, url, data });
            });
          });
        });
      })
      .then(() => {
        toggleLoading(false);
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("errorCode", errorCode, "errorMessage", errorMessage);
        toggleLoading(false);
      })
      .finally(error => {
        console.log("The error is: " + error);
      });
    return result;
  };
  const getClassRooms = async group => {
    toggleLoading(true);
    console.log(group);
    const storage = firebase.storage();
    let result = [];
    await storage
      .ref("Classes/" + group)
      .then(async function(res) {
        res.prefixes.forEach(async function(folderRef) {
          let img = await getClassRoomImage(folderRef.name);
          result.push({ folderRef, img });
        });
      })
      .then(() => {
        toggleLoading(false);
      });
    return result;
  };
  const signup = (email, password, displayName) => {
    signingInSoDontDispatchOnAuthStateChange.current = true;
    toggleLoading(true);
    let user = "";

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        user = firebase.auth().currentUser;
        user.sendEmailVerification();
      })
      .then(() => {
        user.updateProfile({
          displayName
        });
      })
      .then(() => {
        toggleLoading(false);
        // Set user with displayName here because user.updateProfile
        // is async and our onAuthStateChanged listener will fire
        // before the user is updated. When that happens, user.displayName
        // value will be null.
        // Reference: https://github.com/firebase/firebaseui-web/issues/36
        const updatedUserWithDisplayName = {
          ...user,
          displayName
        };

        dispatch({
          type: AuthProvider.actions.setUser,
          payload: {
            user: updatedUserWithDisplayName
          }
        });
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode, "errorMessage", errorMessage);
        toggleLoading(false);
      });
  };
  const downloadMulti = async files => {
    files
      .forEach(function(file) {
        console.log(file);
        var xhr = new XMLHttpRequest();

        xhr.open("GET", file);
        xhr.send();
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  const signin = async (email, password) => {
    toggleLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        toggleLoading(false);
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("errorCode", errorCode, "errorMessage", errorMessage);
        toggleLoading(false);
      })
      .finally(error => {
        console.log("The error is: " + error);
      });
  };

  const signout = () => {
    toggleLoading(true);

    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        toggleLoading(false);
      })
      .catch(function(error) {
        // An error happened.
        toggleLoading(false);
      });
  };

  const sendResetPasswordEmail = email => {
    toggleLoading(true);

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function() {
        // Email sent.
        toggleLoading(true);
        // TODO: Toggle success notification here.
      })
      .catch(function(error) {
        // An error happened.
        console.log("error", error);
        toggleLoading(false);
      });
  };

  const toggleLoading = isLoading => {
    dispatch({
      type: AuthProvider.actions.toggleLoading,
      payload: {
        value: isLoading
      }
    });
  };

  const value = {
    addUserToGroup,
    createUserGroup,
    downloadFile,
    downloadMulti,
    getAllUsers,
    getClassRoomImage,
    getClassRooms,
    getFiles,
    getFilesAccess,
    getGroupInfo,
    getImage,
    getLoggedInUser,
    getUser,
    getUserGroups,
    isLoading: state.isLoading,
    isLoggedIn: state.isLoggedIn,
    progress: state.progress,
    removeUserFromGroup,
    sendResetPasswordEmail,
    signin,
    signout,
    signup,
    uploadFile,
    uploadFileToLocation,
    uploadImage,
    uploadSharedFile,
    user: initialUser || state.user,
    userAccess: userAccess
  };

  return state.isInitiallyLoading ? (
    <FullPageLoading />
  ) : (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
