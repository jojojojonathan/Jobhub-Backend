const router = require("express").Router();
const messageController = require("../controllers/messageController");
const { verifyAndAuthorization, verifyAndAdmin } = require("../middleware/verifyToken");

// SEND
router.post("/", verifyAndAuthorization, messageController.sendMessage);

// GET
router.get("/:id", verifyAndAuthorization, messageController.getAllMessages);

module.exports = router