const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const productRouter = require("./routes/productRoute");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;
const DB = process.env.DB_URL;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/products", productRouter);

mongoose
  .connect(DB)
  .then(() => {
    console.log("connected to db succesfully!");
    app.listen(PORT, () => {
      console.log(`Example app listening on port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
