const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const app = express();
const PORT = 8080;
const DB_URL = `mongodb+srv://amirovknn:gwp123@cluster0.46hkp7d.mongodb.net/`;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("connected to db succesfully!");
    app.listen(PORT, () => {
      console.log(`Example app listening on port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const productScheam = new Schema({
  title: { type: String, required: true },
  price: { type: Number, requred: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Products = mongoose.model("Products", productScheam);

//get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Products.find({});
    res.send(products).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//get product by id

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    res.send(product).status(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//delete product by id

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProducts = await Products.findByIdAndDelete(id);
    const products = await Products.find({});
    // res.status(200).send(products);
    res.status(200).send(deletedProducts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//post new product

app.post("/products", async (req, res) => {
  const newProduct = new Products(req.body);

  try {
    await newProduct.save();
    res.status(201).send({
      message: "created succesfully!",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// update data, put

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Products.findByIdAndUpdate(id, req.body);
    const updatedProduct = await Products.findById(id);
    res.status(200).send({
      message: "updated succesfully!",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
