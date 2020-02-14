export const uploadImage = (image) => {
    const storage = firebase.storage()
    const uploadTask = storage.ref(`/${image.name}`).put(image);
    
    console.log(image)
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progressed = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        //updateProgress(progressed)
      },
      error => {
        // Error function ...
        console.log(error);
      },
      /*() => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }*/
    );
  }