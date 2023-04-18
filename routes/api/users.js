const express = require("express");
const ctrlUser = require("../../controllers/users");
const path = require("path");
const multer = require("multer");
const uploadDir = path.join(process.cwd(), "tmp");

const router = express.Router();
const authorization = require("../../auth/authorization");

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadDir);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});
const upload = multer({ storage });

router.post("/signup", ctrlUser.signUp);

router.post("/login", ctrlUser.logIn);

router.get("/logout", authorization, ctrlUser.logOut);

router.get("/current", authorization, ctrlUser.current);
router.patch("/avatars", authorization, upload.single('avatar'), ctrlUser.avatar);
router.get("/verify/:verificationToken", ctrlUser.emailVerification);
router.post("/verify/", ctrlUser.resendEmailVerification);


module.exports = router;