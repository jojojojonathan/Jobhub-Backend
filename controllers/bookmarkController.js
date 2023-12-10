const Bookmark = require("../models/Bookmark");
const Job = require("../models/Job");

module.exports = {
    createBookmark: async (req, res) => {
        const jobId = req.body.job;
        const newBookmark = new Bookmark({job: jobId, userId: req.user.id});
        // const newBookmark = new Bookmark(req.body);

        try {
            const job = await Job.findById(jobId);
            console.log(job)
            if ( !job ) {
                return res.status(404).json("Job Not Found");
            }


            const savedBookmark = await newBookmark.save();
            const { __v, updateAt, ...newBookmarkInfo} = savedBookmark._doc;

            res.status(200).json(newBookmarkInfo);
 
        } catch ( error ) {
            res.status(500).json(error);
        }
    },

    deleteBookmark: async (req, res) => {
        try {
             await Bookmark.findByIdAndDelete(req.params.id);
             res.status(200).json("Bookmark Successfully Deleted");
         } catch ( error ) {
             res.status(500).json(error);
         }
     },

    getBookmarks: async (req, res) => {
        try {
             const bookmarks = await Bookmark.find({userId: req.params.userId});
             res.status(200).json(bookmarks);
         } catch ( error ) {
             res.status(500).json(error);
         }
     },


}