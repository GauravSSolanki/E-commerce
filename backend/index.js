require("./Dbconnect");

const User = require("./models/userSchema");

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4500;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const secretKey = "secretkey";

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  let data = await User.find();
  res.send(data);
});

app.post("/register", async (req, res) => {
  let data = new User(req.body);
  let result = await data.save();
  res.send(result);
  // console.log(result);
});

app.put("/:_id", async (req, res) => {
  let data = await User.updateOne(req.params, { $set: req.body });
  res.send(data);
  // console.log(data);
});

app.delete("/:_id", async (req, res) => {
  let data = await User.deleteOne(req.params);
  res.send(data);
  // console.log("deleted :" + data);
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(200).json({
      message: "User not exist",
    });
  }
  // console.log(user);

  if (req.body.password != user.password) {
    res.status(400).send({
      message: "Incorrect Data",
    });
  }

  // const data={
  //   user:{
  //     id = user.id,
  //   }
  // }
  // console.log(user.id);

  jwt.sign({ user }, secretKey, { expiresIn: "1000s" }, (err, token) => {
    res.send({
      token,
    });
  });
});

app.post("/profile", VerifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, AuthData) => {
    if (err) {
      res.status(200).json({
        message: "Invalid token or expired",
      });
    } else {
      console.log(AuthData);
      res.status(200).send({
        message: "valid token access",
        AuthData,
      });
    }
  });
});

function VerifyToken(req, res, next) {
  const bearerheader = req.headers("authorization");
  if (typeof bearerheader !== "undefined") {
    req.token = token;
    next();
  } else {
    res.send({
      message: "Token is not valid",
    });
  }
}

// app.get("/search", (req, res) => {
//   // const query = {$:{}}
//   const Data = User.find().where().
// });


// app.post("/upload", upload, (req, res) => {});

app.listen(PORT, () => {
  console.log("Server is listening on http://localhost:" + PORT);
});
