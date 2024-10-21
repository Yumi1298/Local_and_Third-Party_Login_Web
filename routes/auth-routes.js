const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get(
  "/google",
  // 第一個參數使用甚麼的認證,第二個參數物件
  // scope從Resource Server中拿取甚麼樣的資料
  // scope:["email"], prompt: "select_account"，讓使用者可以選擇多個google帳號
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// 加入passport.authenticate("google")這個middle ware的原因為進到這個路由必須是已經通過驗證的才能使用
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // redirect重新導向
  return res.redirect("/profile");
});

module.exports = router;
