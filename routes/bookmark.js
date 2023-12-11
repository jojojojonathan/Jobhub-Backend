const router = require("express").Router();
const bookmarkController = require("../controllers/bookmarkController");
const { verifyToken, verifyAndAuthorization } = require("../middleware/verifyToken");


// CREATE BOOKMARKS
router.post("/", bookmarkController.createBookmark);

// DELETE BOOKMARKS
router.delete("/:id", verifyToken, bookmarkController.deleteBookmark);

// GET BOOKMARKS
router.get("/", verifyAndAuthorization, bookmarkController.getBookmarks);

module.exports = router