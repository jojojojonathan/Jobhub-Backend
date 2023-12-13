const router = require("express").Router();
const chatController = require("../controllers/chatController");
const { verifyAndAuthorization, verifyAndAdmin } = require("../middleware/verifyToken");

// SEND
router.post("/", verifyAndAuthorization, chatController.accessChat);

// GET
router.get("/", verifyAndAuthorization, chatController.getChat);

module.exports = router