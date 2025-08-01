const express = require("express");
const Router = require("router");

const {
  signupUser,
  loginUser,
  logoutUser,
  verifyUser,
  updateUser,
  updateAvatar,
  refreshToken,
  getUserDetails
} = require("../controllers/user.controller");
const { auth } = require("../middleware/auth.middleware");
const { authRefresh } = require("../middleware/refreshToken.middleware");
const { upload } = require("../middleware/file.middleware");
const userRouter = Router();

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", auth, logoutUser);
userRouter.get("/verify/:id/:token", verifyUser);
userRouter.put("/update-user", auth, updateUser);
userRouter.put("/update-avatar", auth, upload.single("avatar"), updateAvatar);
userRouter.post("/refresh-token", authRefresh, refreshToken);
userRouter.get("/get-user-details" , auth , getUserDetails)

module.exports = userRouter;
