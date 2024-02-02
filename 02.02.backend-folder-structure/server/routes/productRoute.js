const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProductById);
router.post("/", productController.addNewProduct);
router.put("/:id", productController.updateProductById);

module.exports = router;
