const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model");

passport.use(
  new GoogleStrategy(
    {
      // GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET 可自命名
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("進入google strategy 的區域");
      console.log(profile);
      console.log("====================");
      let foundUser = await User.findOne({ googleID: profile.id }).exec();
      if (foundUser) {
        console.log("使用者已經註冊過了，無須存入資料庫內");
      } else {
        console.log("偵測到新用戶。需將資料存入資料庫");
      }
    }
  )
);
