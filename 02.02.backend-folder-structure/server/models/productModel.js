const mongoose = require("mongoose");
const { Schema } = mongoose;
const productScheam = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productScheam);

module.exports = Products;
