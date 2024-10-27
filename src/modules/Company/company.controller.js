import App from "../../../DB/models/application.model.js";
import Company from "../../../DB/models/company.model.js";

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, company }
 * @description add company
 */

export const addCompany = async (req, res) => {
  // destruct data from req.body
  const {
    companyName,
    description,
    industry,
    address,
    numberOfEmployees,
    companyEmail,
    companyHR
  } = req.body

  const { _id } = req.authUser;

  // create new company instance
  const companyInstance = new Company({
    companyName,
    description,
    industry,
    address,
    numberOfEmployees,
    companyEmail,
    companyHR: _id
  });

  // create new company
  const company = await Company.create(companyInstance);

  // response
  res.status(201).json({msg:'company created', company})
}

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, company }
 * @description update company
 */

export const updateCompany = async (req, res) => {

  // destruct data from req.body
  const {companyName, description, industry} = req.body;

  // destruct id from req.params
  const { id } = req.params;

  // destruct _id from req.authUser
  const { _id } = req.authUser;

  // find company and update
  const updatedCompany = await Company.findOneAndUpdate({companyHR: _id , _id:id} , 
    {
      companyName,
      description,
      industry
    },
    {new:true}
  )

  // in the absence of a company
  if (updatedCompany == null)
    return res.status(404).json({msg: 'not found'})

  // response
  res.status(200).json({msg: 'updated company', updatedCompany})
}

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, company }
 * @description delete company
 */

export const deleteCompany = async (req, res) => {
  
  // destruct id from req.params
  const { id } = req.params;

  // destruct _id from req.authUser
  const { _id } = req.authUser;

  // find copany and delete
  const deletedCompany = await Company.findOneAndDelete({companyHR: _id , _id:id})

  // in the absence of a company
  if (deletedCompany == null)
    return res.status(404).json({msg: 'not found'})

  // response
  res.status(200).json({msg: 'deleted company', deletedCompany})
}

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, company }
 * @description get company
 */

export const getCompany = async (req, res) => {

  // destruct id from req.params
  const { id } = req.params;

  // destruct _id from req.authUser
  const { _id } = req.authUser;

  // find company
  const company = await Company.find({companyHR: _id, _id: id})

  // response
  res.status(200).json({msg: 'get company seccussefully', company})
}

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, company }
 * @description search company
 */

export const searchCompany = async (req, res) => {

  // destruct companyName from req.query
  const {companyName} = req.query

  // find company
  const companies = await Company.find({companyName})

  // response
  res.status(200).json({msg: 'get all companies' ,companies})
}

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, application }
 * @description get application
 */

export const getApps = async (req, res) => {

  // destruct jobId from req.query
  const {jobID} = req.query

  // find app
  const apps = await App.find({jobID}).populate('userID').exec()

  // response
  res.status(200).json({msg:"get applications", apps})
}