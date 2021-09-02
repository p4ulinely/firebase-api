const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();

const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// const db = admin.firestore();

app.use(cors({origin: true}));

const ArticleController = require("./ArticlesController");

app.get("/hello", (req, res) => {
  return res.status(200).send("Hello World!");
});

app.post("/create", ArticleController.criar);

// read item
app.get("/read/:id", ArticleController.mostrarUm);

// read all
app.get("/read", ArticleController.mostrar);

// update
// app.put("/update/:id", (req, res) => {
//     (async () => {
//         try {
//             const document = db.collection("items").doc(req.params.id);

//             await document.update({
//                 title: req.body.title
//             });

//             return res.status(200).send();
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send(error);
//         }
//         })();
//     });

//     // delete
//     app.delete("/delete/:id", (req, res) => {
//     (async () => {
//         try {
//             const document = db.collection("articles").doc(req.params.id);
//             await document.delete();

//             return res.status(200).send();
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send(error);
//         }
//         })();
//     });

exports.app = functions.https.onRequest(app);
