import { initializeApp } from "firebase-admin/app";
import { onRequest } from "firebase-functions/v1/https";
import app from "./app";
import onUserCreated from "./infra/events/user-created";

initializeApp();

export const api = onRequest(app);

export const setIncrementIdOnUserCreated = onUserCreated.setIncrementIdHandler;
