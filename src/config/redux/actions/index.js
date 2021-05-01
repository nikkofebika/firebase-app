import firebase, { database } from "../../firebase";

export const registerNewUser = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_ISLOADING", value: true });
  return firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((userCredential) => {
      //   var user = userCredential.user;
      console.log("signup succcess", userCredential.user);
      dispatch({ type: "CHANGE_ISLOADING", value: false });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("signup error", errorCode, errorMessage);
      dispatch({ type: "CHANGE_ISLOADING", value: false });
    });
};

export const loginUser = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_ISLOADING", value: true });
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        const dataLogin = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          emailVerified: userCredential.user.emailVerified,
          refreshToken: userCredential.user.refreshToken,
        };
        dispatch({ type: "CHANGE_ISLOADING", value: false });
        dispatch({ type: "CHANGE_LOGIN", value: true });
        dispatch({ type: "CHANGE_DATAUSER", value: dataLogin });
        localStorage.setItem("userData", JSON.stringify(dataLogin));
        resolve(dataLogin);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("login error", errorCode, errorMessage);
        dispatch({ type: "CHANGE_ISLOADING", value: false });
      });
  });
};

export const postData = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_ISLOADING", value: true });
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref("notes/" + data.userId)
      .push(data);
    dispatch({ type: "CHANGE_ISLOADING", value: false });
    resolve(true);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("login error", errorCode, errorMessage);
    dispatch({ type: "CHANGE_ISLOADING", value: false });
  });
};

export const getData = (uid) => (dispatch) => {
  const starCountRef = database.ref("notes/" + uid);
  return new Promise((resolve, reject) => {
    starCountRef.on("value", (snapshot) => {
      const data = [];
      // updateStarCount(postElement, data);
      // console.log("snapshot", snapshot.val());
      snapshot.val() !== null &&
        Object.keys(snapshot.val()).map((key) => {
          data.push({
            id: key,
            data: snapshot.val()[key],
          });
        });
      dispatch({ type: "SET_DATAS", value: data });
      resolve(data);
    });
  });
};

export const updateData = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`notes/${data.userId}/${data.noteId}`)
      .set(
        {
          title: data.title,
          content: data.content,
          date: new Date(),
        },
        (error) => {
          if (error) {
            reject(false);
          } else {
            resolve(true);
          }
        }
      );
  });
};

export const deleteData = (userId, noteId) => (dispatch) => {
  const urlDelete = database.ref(`notes/${userId}/${noteId}`);
  return new Promise((resolve, reject) => {
    urlDelete.remove();
  });
};
