import { initializeApp } from "firebase-admin/app";
import functions from "./functions/";

initializeApp();

export const incrementIdOnUserCreated = functions.onUserCreated;
