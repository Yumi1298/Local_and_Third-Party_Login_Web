const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/google", (req, res) => {
  // 第一個參數使用甚麼的認證,第二個參數物件
  // scope從Resource Server中拿取甚麼樣的資料
  // scope:["email"], prompt: "select_account"，讓使用者可以選擇多個google帳號
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  });
});

module.exports = router;
