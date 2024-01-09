require('./mongoose');
const User = require("./userSchema");

const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 4500;
const mongoose= require('mongoose');

app.use(cors())
app.use(express.json());

app.get('/',async(req,res)=>{
    let data = await User.find()
    res.send(data);
})

app.post('/postData',async(req,res)=>{
    let data = new User(req.body)
    let result = await data.save();
    res.send(result);
    console.log(result);
})

app.put('/putData/:_id',async(req,res)=>{
    let data = await User.updateOne(req.params,
       { $set: req.body}
    )
    res.send(data);
    console.log(data);
})
app.delete('/deleteData/:_id',async(req,res)=>{
    let data = await User.deleteOne(req.params)
    res.send(data);
    console.log("deleted :"+ data);
})

app.listen(PORT,()=>{
console.log("Server is listening on http://localhost:" + PORT);
})