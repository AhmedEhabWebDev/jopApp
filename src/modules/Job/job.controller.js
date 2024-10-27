import App from "../../../DB/models/application.model.js";
import Company from "../../../DB/models/company.model.js";
import Job from "../../../DB/models/job.model.js";

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, job }
 * @description add job
 */

export const addJob = async (req, res) => {

  // destruct data from req.body
  const {
    jobTitle,
    jobLocation,
    workingTime,
    seniorityLevel,
    jobDescription,
    technicalSkills,
    softSkills,
  } = req.body;

  // destruct _id from req.authUser
  const { _id } = req.authUser;

  // create new job instance
  const jobInstance = new Job({
    jobTitle,
    jobLocation,
    workingTime,
    seniorityLevel,
    jobDescription,
    technicalSkills,
    softSkills,
    addedBy: _id,
  });
  
  // create new job
  const job = await Job.create(jobInstance);

  // response
  res.status(201).json({ msg: "added job", job });
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, updateJob }
 * @description update job
 */

export const updateJob = async (req, res) => {

  // destruct data from req.body
  const { jobTitle, jobLocation } = req.body;

  // destruct id from req.params
  const { id } = req.params;

  // destruct _id from req.authUser
  const { _id } = req.authUser;

  // find job and update 
  const updatedJob = await Job.findOneAndUpdate(
    { addedBy: _id, _id: id },
    {
      jobTitle,
      jobLocation,
    },
    { new: true }
  );

  // response
  res.status(200).json({ msg: "updated job", updatedJob });
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, deleteJob }
 * @description delete job
 */

export const deleteJob = async (req, res) => {

  // destruct id from req.params
  const { id } = req.params;

  // destruct _id from req.authUser
  const { _id } = req.authUser;

  // find job and delete 
  const deletedJob = await Job.findOneAndDelete({ addedBy: _id, _id: id });

  // response
  res.status(200).json({ msg: "deleted job", deletedJob });
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, jobs }
 * @description get jobs
 */

export const getJobs = async (req, res) => {

  // destruct _id from req.authUser
  const { _id } = req.authUser;

  // find job and ref to company
  const jobs = await Job.find().populate("companyID").exec();

  // response
  res.status(200).json({ msg: "get all jobs", jobs });
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, job }
 * @description get Jobs For Specific Company
 */

export const getJobsForSpecificCompany = async (req, res) => {
  // destruct companyID from req.query
  const { companyID } = req.query;

  // find job
  const jobs = await Job.find({ companyID });

  // response
  res.status(200).json({ msg: "get Jobs For Specific Company", jobs });
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, job }
 * @description get Jobs Filters
 */

export const getJobsFilters = async (req, res) => {

  // destruct data from req.query
  const {
    workingTime,
    jobLocation,
    seniorityLevel,
    jobTitle,
    technicalSkills,
  } = req.query;

  // find job
  const jobs = await Job.find({
    workingTime,
    jobLocation,
    seniorityLevel,
    jobTitle,
    technicalSkills,
  });

  // response
  res.status(200).json({ msg: "get Jobs For Specific Company", jobs });
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, application }
 * @description apply job
 */

export const applyJob = async (req, res) => {

  // destruct _id from req.authUser
  const { _id } = req.authUser;

  // destruct data from req.body
  const { jobID, userTechSkills, userSoftSkills } = req.body;

  // create new application instance
  const applicationInstance = new App({
    jobID,
    userID:_id,
    userTechSkills,
    userSoftSkills,
  });

  // create new application
  const application = await App.create(applicationInstance)

  // response
  res.status(201).json({msg: "created application", application})
};