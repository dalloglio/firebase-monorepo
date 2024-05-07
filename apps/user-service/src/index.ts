import { initializeApp } from "firebase-admin/app";
import { onRequest } from "firebase-functions/v1/https";
import app from "./app";

initializeApp();

export const api = onRequest(app);
