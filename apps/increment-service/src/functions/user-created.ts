import { getFirestore } from "firebase-admin/firestore";
import { firestore } from "firebase-functions/v1";
import { OnUserCreatedHandler } from "../handlers/user-created";

export const onUserCreated = firestore
  .document("/users/{userId}")
  .onCreate((snap) => {
    return new OnUserCreatedHandler(getFirestore()).handle(snap.ref);
  });
