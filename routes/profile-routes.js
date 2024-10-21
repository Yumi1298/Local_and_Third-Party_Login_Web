const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("進入/profile");
  return res.render("profile", { user: req.user }); // deSerializeUser()
});

module.exports = router;
