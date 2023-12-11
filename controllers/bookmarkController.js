const Bookmark = require("../models/Bookmark");
const Job = require("../models/Job");
const jwt = require("jsonwebtoken");

module.exports = {
  createBookmark: async (req, res) => {
    const jobId = req.body.job;
    try {
      const job = await Job.findById(jobId);

      if (!job) {
        return res.status(404).json({ error: "Job Not Found" });
      }

      const authHeader = req.headers.token;
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
        if (err) res.status(403).json("Invalid Token");

        req.user = user;
        const newBook = new Bookmark({ job: job, userId: user.id });
        
        const savedBookmark = await newBook.save();
        
        const { __v, updateAt, createdAt, ...newBookmarkInfo } = savedBookmark._doc;
        console.log(newBookmarkInfo)
        res.status(200).json(newBookmarkInfo);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  deleteBookmark: async (req, res) => {
    try {
      const userId = req.user.id;
      const jobId = req.params.id;
      await Bookmark.findByOneAndDelete({ userId, jobId});
      res.status(200).json("Bookmark Successfully Deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getBookmarks: async (req, res) => {
    try {
      const bookmarks = await Bookmark.find({ userId: req.user.id });
      const bookmarksWithJobDetails = await Promise.all(
        bookmarks.map(async (bookmark) => {
          const job = await Job.findById(bookmark.job);
          return { ...bookmark.toObject(), job };
        })
      );
      
      // const { updateAt, createdAt, ...bookmarkInfo } = bookmarksWithJobDetails._doc;
      res.status(200).json(bookmarksWithJobDetails);
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  },
};
