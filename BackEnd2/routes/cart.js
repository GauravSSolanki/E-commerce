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
    const { items } = req.body;
    if (items.length != 3) {
        res.status(400).send("Fill all data First");
    }

    // Calculate total price
    const total = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const userId = req.user.id;

    // Create a new cart document
    const cart = new Cart({
      userId,
      items,
      total,
    });

    // Save the cart to the database
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
