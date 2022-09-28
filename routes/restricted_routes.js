const express = require("express");

const Note = require("../models/Note")

const { render_restricted } = require("../controllers/page_controller");

const router = express.Router();

const add = async (req,res) => {
    await Note.create(req.body)
    res.redirect("/restricted/notes-list")
}

const notesList = async (req,res) => {
    const notes = await Note.find()
    res.render("pages/noteslist", { notes })

}

const deleteNote = async (req,res) => {
    await Note.findByIdAndDelete(req.params.noteid)
    res.redirect("/restricted/notes-list")
}

const show = async (req, res) => {
    const note = await Note.findById(req.params.noteid)
    res.render("pages/show", { note })
}

const showSafe = async (req, res) => {
    const note = await Note.findById(req.params.noteid)
    res.render("pages/show-safe", { note })
}

router.route("/").get(render_restricted);
router.route("/add-note").get((req,res) => { 
    res.render("pages/add-note")
  }).post(add)
router.route("/not-found-note").get((req,res) => {render("pages/not-found-note")})
router.route("/notes-list").get(notesList)
router.route("/show/:noteid").get(show)
router.route("/show-safe/:noteid").get(showSafe)
router.route("/delete/:noteid").get(deleteNote)

module.exports = router;
