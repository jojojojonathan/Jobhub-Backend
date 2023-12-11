const router = require("express").Router();
const jobController = require("../controllers/jobController");
const { verifyAndAuthorization, verifyAndAdmin } = require("../middleware/verifyToken");


// CREATE
router.post("/", verifyAndAdmin, jobController.createJob);

// UPDATE 
router.put("/:id", verifyAndAdmin, jobController.updateJob);

// DELETE
router.delete("/:id", verifyAndAdmin, jobController.deleteJob);

// GET
router.get("/:id", jobController.getJob);

// GET ALL
router.get("/", jobController.getAllJob);

// SEARCH
router.get("/search/:key", jobController.searchJob);

module.exports = router