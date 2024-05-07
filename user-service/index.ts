import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {onRequest} from "firebase-functions/v1/https";

initializeApp();
const db = getFirestore();

export const createUser = onRequest(async (req, res) => {
  const {name} = req.body;
  await db.collection("users").doc(name).set({name});
  res.status(201).end();
});
