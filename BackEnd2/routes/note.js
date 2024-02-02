const express = require("express")
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/NoteSchema")
const { body, validationResult } = require('express-validator');


// 1. get all notes using "GET" : "/api/notes/fetchallnotes" 

router.get("/getnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.status(200).json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("internal server error")
    }
})


router.post("/addnote", fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 })
], async (req, res) => {
    try {
        console.log("User ID:", req.user); // Log the entire req.user object

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        const userId = req.user ? req.user.id : null; // Safely access user ID

        console.log("User ID:", userId); 

        const user = req.user.id;
        console.log(user);

        // Create a new note object with the user ID
        const note = new Note({ title, description, tag, user });
        // Save the note to the database
        const savedNote = await note.save();
        res.status(200).json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router
