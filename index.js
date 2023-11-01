/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./ffunctionsgyakorlas-firebase-adminsdk-se1s7-0fdd438e78.json")
const { onCall, HttpsError } = require("firebase-functions/v2/https");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://ffunctionsgyakorlas-default-rtdb.europe-west1.firebasedatabase.app"
})
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// auth trigger (new user signup)
exports.newUserSignUp = functions.auth.user().onCreate(user => {
    // for background triggers you must return a value/promise
    return admin.firestore().collection("users").doc(user.uid).set({
        email: user.email,
        upvotedOn: [],
    });
});

// auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete(user => {
    const doc = admin.firestore().collection("users").doc(user.uid);
    return doc.delete();
});

exports.addRequest = onCall((request) => {
    if (!request.auth) {
        throw new HttpsError(
            "unauthenticated",
            "Csak bejelentkezett felhasználók küldhetnek üzenetet!"
        )
    }

    if (request.data.text.length > 30) {
        throw new HttpsError(
            "invalid-argument",
            "Az üzenet hossza nem lehet több 30 karakternél!"
        );
    }

    return admin.firestore().collection("requests").add({
        text: request.data.text
    })
})

const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const { databaseURL } = require("firebase-functions/params");

const expressApp = express()


expressApp.use(cors({
    origin: "*"
}))

expressApp.use(bodyParser.json());

const verifyToken = (req,res,next) =>
{
    const idToken = req.headers.authorization;

    admin.auth()
    .verifyIdToken(idToken)
    .then((decodedToken)=> {
        req.user = decodedToken;
        next();
    })
    .catch((error) => {
        console.error("Hiba történt a token ellenőrzésekor: ", error);
        res.sendStatus(401);
    })
}

expressApp.post("/setCustomClaims",verifyToken,(req,res)=>
    {
        const {uid,claims} = req.body;
        admin.auth()
        .setCustomUserClaims(uid,claims)
        .then(()=>{
            console.log("A felhasználó jogosultsága sikeresen beállítva.")
            res.json({message: "A felhasználó jogosultsága sikeresen beállítva."})
        })
        .catch((error)=>{
            console.error("Hiba történt a felhasználó jogosultságának beállításakor: ", error);
            res.sendStatus(500);
        });
    }
);

expressApp.get("/users", verifyToken, (req, res) =>{
    admin.auth()
    .listUsers()
    .then((userRecords)=>{
        const users = userRecords.users.map((user)=>({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            claims: user.customClaims,
            phoneNumber: user.phoneNumber,
            photo: user.photoURL,
            multiFactor: user.multiFactor
        }))
        res.json(users)
    })
    .catch((error)=>{
        console.error("Hiba a felhasználói adatok lekérésénél: ", error);
        res.sendStatus(500);
    });
});

expressApp.get("/users/:uid/claims", verifyToken, (req,res)=>{
    const {uid} = req.params;
    admin.auth()
    .getUser(uid)
    .then((userRecord)=>{
        res.json(userRecord.customClaims)
    })
    .catch((error)=>{
        console.error("Hiba történt a felhasználó lekérdezésekor: ", error);
        res.sendStatus(500);
    });
});

exports.api = functions.https.onRequest(expressApp);