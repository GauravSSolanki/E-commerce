require("./Dbconnect");

const User = require("./models/userSchema");
const Note = require("./models/NoteSchema");
const Cart = require('./models/CartSchema');

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4500;
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());


app.use(express.Router());
app.use("/cart", require("./routes/cart"))
app.use("/user", require("./routes/auth"))
// app.use("/notes", require("./routes/note"))

app.listen(PORT, () => {
  console.log("Server is listening on http://localhost:" + PORT);
});

