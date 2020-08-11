import firebase from "./config";

const db = firebase.firestore();

export const getUser = (uid, cb) => {
  db.collection("users")
    .doc(uid)
    .get()
    .then((res) => cb(res.data()));
};

export const getFriendList = (uids, isFriend, cb) => {
  Object.entries(uids).forEach((uid) => {
    if (uid[1] === isFriend) {
      db.collection("users")
        .doc(uid[0])
        .get()
        .then((res) => cb(res.data()));
    }
  });
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

export const createChat = (self_user, friend_user) => {
  const ref = db.collection("chats").doc();
  const chat_id = ref.id;
  db.collection("chats")
    .doc(chat_id)
    .set({
      chat_id: chat_id,
      user_id_1: [self_user.uid, self_user.displayName, self_user.photoURL],
      user_id_2: [
        friend_user.uid,
        friend_user.displayName,
        friend_user.photoURL,
      ],
    });

  db.collection("users")
    .doc(self_user.uid)
    .set(
      {
        chats: [chat_id],
      },
      { merge: true }
    );
  db.collection("users")
    .doc(friend_user.uid)
    .set(
      {
        chats: [chat_id],
      },
      { merge: true }
    );
};

export const getChats = (chats_ids, cb) => {
  chats_ids.forEach((chat_id) => {
    db.collection("chats")
      .doc(chat_id)
      .get()
      .then((res) => cb(res));
  });
};

export const writeMessage = (message, chat_id) => {
  db.collection("chats").doc(chat_id).collection("messages").add({
    uid: message.sender_uid,
    displayName: message.sender_displayName,
    message: message.message,
    timestamp: Date.now(),
  });
};

export const getMessages = (chat_id, cb) => {
  db.collection("chats")
    .doc(chat_id)
    .collection("messages")
    .orderBy("timestamp")
    .onSnapshot((res) => {
      cb(res);
    });
};
