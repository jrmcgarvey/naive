const User = require("../models/User");

const render_index = (req, res) => {
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
    req.session.messages = [];
  }
  res.render("pages/index", { messages });
};

const render_sign_up = (req, res) => {
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
    req.session.messages = [];
  }
  res.render("pages/sign-up-form", { messages });
};

const sign_up = async (req, res) => {
  await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.redirect("/");
};

const render_restricted = (req, res) => {
  if (!req.session.pageCount) {
    req.session.pageCount = 1;
  } else {
    req.session.pageCount++;
  }
  res.render("pages/restricted", { pageCount: req.session.pageCount });
};

const log_out = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect("/");
  });
};

module.exports = {
  render_index,
  render_sign_up,
  sign_up,
  render_restricted,
  log_out,
};
