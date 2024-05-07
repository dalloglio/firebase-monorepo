import admin from "firebase-admin";
import functions from "firebase-functions";

admin.initializeApp();
const db = admin.firestore();

export const createUser = functions.https.onRequest(async (req, res) => {
  const {name} = req.body;
  await db.collection("users").doc(name).set({name});
  res.status(201).end();
});
