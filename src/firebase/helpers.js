import firebase from "./config";

const db = firebase.firestore();

export const getUser = (uid, cb) => {
  db.collection("users")
    .doc(uid)
    .get()
    .then((res) => cb(res.data()));
};

export const getFriendByParam = (param, condition, value, cb) => {
  db.collection("users")
    .where(param, condition, value)
    .get()
    .then((snapshot) =>
      snapshot.forEach((res) => {
        cb(res);
      })
    );
};

export const getFriendsList = (self_uid, isFriend, cb) => {
  db.collection("users")
    .where(`friends.${self_uid}`, "==", isFriend)
    .get()
    .then((snapshot) => {
      const friendsDataArray = [];
      snapshot.forEach((res) => {
        friendsDataArray.push(res.data());
      });
      cb(friendsDataArray);
    });
};

export const createUser = (user) => {
  const { uid, photoURL, email, displayName } = user;
  db.collection("users").doc(user.uid).set({
    uid: uid,
    photoURL: photoURL,
    displayName: displayName,
    email: email,
  });
};

export const sendFriendRequest = (self_uid, friend_uid) => {
  db.collection("users")
    .doc(friend_uid)
    .set(
      {
        friends: { [self_uid]: false },
      },
      { merge: true }
    );
};

export const acceptFriendRequest = (self_uid, friend_uid) => {
  db.collection("users")
    .doc(self_uid)
    .set(
      {
        friends: { [friend_uid]: true },
      },
      { merge: true }
    );
};

export const rejectFriendRequest = (self_uid, friend_uid) => {
  getUser(self_uid, (res) => {
    delete res.friends[friend_uid];
    db.collection("users").doc(self_uid).update(res);
  });
};
