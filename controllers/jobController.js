const Job = require('../models/Job');

module.exports = {
    createJob: async (req, res) => {
        const newJob = new Job(req.body);

        try {
            const savedJob = await newJob.save();

            const { password, __v, createdAt, updateAt, ...newJobInfo} = savedJob._doc;

            res.status(200).json(newJobInfo);
        } catch ( error ) {
            res.status(500).json(error);
        }
    },

    updateJob: async (req, res) => {
       try {
            const updateJob = await Job.findByIdAndUpdate(
                req.params.id, {
                    $set: req.body
                }, {new: true}
            );

            const { password, __v, createdAt, updateAt, ...updateJobInfo} = updateJob._doc;

            res.status(200).json(updateJobInfo);
        } catch ( error ) {
            res.status(500).json(error);
        }
    },

    deleteJob: async (req, res) => {
        try {
             await Job.findByIdAndDelete(req.params.id);
 
             res.status(200).json("Job Successfully Delete");
         } catch ( error ) {
             res.status(500).json(error);
         }
     },

     getJob: async (req, res) => {
        try {
             const job = await Job.findById(req.params.id);

             const { password, __v, createdAt, updateAt, ...jobInfo} = job._doc;
 
             res.status(200).json(jobInfo);
         } catch ( error ) {
             res.status(500).json(error);
         }
     },

     getAllJob: async (req, res) => {
        try {
             const jobs = await Job.find();
             res.status(200).json(jobs);
         } catch ( error ) {
             res.status(500).json(error);
         }
     },

     searchJob: async (req, res) => {
        try {
             const result = await Job.aggregate(
                [
                    {
                      $search: {
                        index: "jobsearch",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
             );
             res.status(200).json(result);
         } catch ( error ) {
             res.status(500).json(error);
         }
     },


}