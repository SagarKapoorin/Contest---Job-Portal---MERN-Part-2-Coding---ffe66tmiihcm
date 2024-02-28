const Job = require('../models/jobModel');
const Application = require('../models/applicationModel');
const { response } = require('express');

// Function to get all jobs
exports.getJobs = async (req, res) => {
  try {
        const all_listings=await Job.find({});
      res.status(200).json(all_listings);
    // TODO: Define the logic to retrieve all job listings from the database
    // TODO: Respond with the list of job listings
  } catch (error) {
    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to create a new job listing
exports.createJob = async (req, res) => {
  try {
    // console.log(req.body);
    const { title, company, location, description } = req.body;
    // console.log(title+" "+company+" "+location+" "+description);
    const newJob=new Job({
      title,
      company,
      location,
      description,
    });
    const newListing=await newJob.save();
    res.status(201).json(newListing);
    // TODO: Define the logic to create a new job listing based on the provided data
    // TODO: Save the new job listing to the database
    // TODO: Respond with a success message and the newly created job listing
  } catch (error) {
    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to apply for a job
exports.applyForJob = async (req, res) => {
  const { jobId } = req.params;
  const { applicantName, applicantEmail, coverLetter } = req.body;

  try {
    const Job_listing=await Job.findById(jobId);
    if(!Job_listing){
      throw new Error('JobId not Exists');
    }else{
      const newJobApplication=new Application({
        job:Job_listing,
        applicantName,
        applicantEmail,
        coverLetter,
      });
      const newApplication=await newJobApplication.save();
      res.status(201).json({message:'New Job application Created'});
    }
    // TODO: Retrieve the job listing with the given 'jobId' from the database
    // TODO: Check if the job listing exists and handle the case when it doesn't
    // TODO: Create a new job application with the provided applicant information
    // TODO: Save the new job application to the database
    // TODO: Respond with a success message and the newly created job application
  } catch (error) {
    // Handle errors by responding with a 500 Internal Server Error
    res.status(500).json({ error: 'Internal server error' });
  }
};
