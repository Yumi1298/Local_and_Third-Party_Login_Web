const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
