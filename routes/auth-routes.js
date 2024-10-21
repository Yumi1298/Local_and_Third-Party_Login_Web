const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user-model");

router.get("/login", (req, res) => {
  return res.render("login", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.send(err);
    return res.redirect("/");
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup", { user: req.user });
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

router.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;
  if (password.length < 8) {
    req.flash("error_msg", "密碼長度過短，至少需要8個數字或英文字");
    return res.redirect("/auth/signup");
  }

  // 確認信箱是否被註冊過
  const foundEmail = await User.findOne({ email });
  if (foundEmail) {
    req.flash(
      "error_msg",
      "信箱已經被註冊。請使用另一個信箱，或者嘗試使用此信箱登入系統"
    );
    return res.redirect("/auth/signup");
  }
});

// 加入passport.authenticate("google")這個middle ware的原因為進到這個路由必須是已經通過驗證的才能使用
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  console.log("進入redirect區域");
  // redirect重新導向
  return res.redirect("/profile");
});

module.exports = router;
