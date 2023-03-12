const express = require("express");
const router = express.Router();
const { imageUpload } = require("../controllers/upload");
const { onlyAdmin } = require("../middleware/auth");

router.route("/cloudinary").post(imageUpload);

module.exports = router;