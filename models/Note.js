const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3
  },
  text: {
    type: String,
    required: [true, "Please provide text"],
    minLength: 3
  }

});

module.exports = mongoose.model("Note", NoteSchema);
