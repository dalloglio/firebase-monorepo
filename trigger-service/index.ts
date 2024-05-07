import functions from "firebase-functions";

export const userCreated = functions.firestore
  .document("users/{userId}")
  .onCreate((snap) => {
    return snap.ref.set({incrementId: 1}, {merge: true});
  });
