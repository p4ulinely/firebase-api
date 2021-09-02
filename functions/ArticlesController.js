const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = {
  async criar(req, res) {
    try {
      await db.collection("articles")
          .doc("/" + req.body.id + "/")
          .create({
            title: req.body.title,
          });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  async mostrar(req, res) {
    try {
      const query = db.collection("articles");
      const response = [];

      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs;

        for (const doc of docs) {
          const selectedArticle = {
            id: doc.id,
            title: doc.data().title,
          };

          response.push(selectedArticle);
        }
      });

      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  async mostrarUm(req, res) {
    try {
      const document = db.collection("articles").doc(req.params.id);
      const article = await document.get();
      const response = article.data();

      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};
