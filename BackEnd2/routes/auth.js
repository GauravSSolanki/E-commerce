const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const secretKey = "secretkey";
const jwt = require("jsonwebtoken");

const router = express.Router();
const { body, validationResult } = require("express-validator");

//create a user "POST" "/api/auth"

router.post(
  "/register",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be min 5 chars").isLength({ min: 5 }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const Buser = await User.findOne({ email: req.body.email });
      if (Buser) {
        return res.status(400).json({ errors: "User Existed" });
      }
      const saltRounds = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      const newuser = User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      newuser
        .then((item) => console.log(item))
        .catch((err) => {
          console.log(err);
          res.json({
            error: "please enter a unique value of email",
            message: err.message,
          });
        });

      const data = {
        user: {
          id: newuser.id,
        },
      };

      const token = jwt.sign({ data }, secretKey);
      
      console.log(token);
      res.send({
        token,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password lenght is ").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      console.log(user);

      const passcomp = bcrypt.compare(password, user.password);

      if (!passcomp) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // jwt.sign({ user }, secretKey, { expiresIn: "1000s" }, (err, token) => {
      //   res.send({
      //     token,
      //   });
      // });

      // console.log(user.id);
      const data = {
        user: {
          id: user.id,
        },
      };

      console.log(data);

      const token = jwt.sign({ data }, secretKey);
      res.send({
        token,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/login", async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

module.exports = router;
