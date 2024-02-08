const express = require("express");
const Cart = require("../models/CartSchema");
const bcrypt = require("bcrypt");
const secretKey = "secretkey";
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const router = express.Router();

router.post("/addproduct", fetchuser, async (req, res) => {
  try {
    // Destructure req.body
    const {
      productId,
      thumbnail,
      price,
      description,
      quantity,
      brand,
      rating,
      title,
      discountPercentage,
    } = req.body;
    console.log(req.body);

    // Check if the product already exists in the cart
    const pdt = await Cart.findOne({ productId: productId });
    if (pdt) {
      return res.json("Product already exists in the cart");
    }

    const total = price * quantity;
    const userId = req.user.id;
    console.log(userId);

    const cart = new Cart({
      userId,
      productId: productId,
      total,
      price,
      rating,
      quantity,
      title,
      description,
      brand,
      thumbnail,
      discountPercentage,
    });
    await cart.save();
    return res.status(201).json("Product added in cart");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.get("/allproducts", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch cart items for the given userId
    const cartItems = await Cart.find({ userId });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/quantity/:idx", fetchuser, async (req, res) => {
  try {
    const { idx } = req.params;
    const userId = req.user.id;
    const { quantity } = req.body;

    if (!req.user.id) {
      return res.status(401).json({ Error: "Token is Expired" });
    }

    const cartItem = await Cart.findOneAndUpdate(
      { userId, productId: idx },
      { $set: { quantity: quantity } }
    );
    // res.json({ Msg: "Updated product" });

    if (cartItem) {
      let newPro = await Cart.find({ userId, productId: idx });
      return res.status(200).json(newPro);
    } else {
      return res.status(404).json({ message: "Product not found in the cart" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete/:idx", fetchuser, async (req, res) => {
  try {
    const { idx } = req.params;
    const userId = req.user.id;
    const cartItems = await Cart.find({ userId, productId: idx });
    if (cartItems.length > 0) {
      const resp = await Cart.deleteOne({ userId, productId: idx });
      console.log(resp);
      return res.status(200).json("Successfully deleted");
    }
    return res.status(200).json("Product may have been deleted already");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
