const router = require("express").Router();

router.get("/", (req, res) => {
  return res.render("profile", { user: req.user }); // deSerializeUser()
});

module.exports = router;
