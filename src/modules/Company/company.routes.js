import { Router } from "express";
import * as companyController from "./company.controller.js";
import { auth } from "../../Middlewares/authentication.middleware.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { authorization } from "../../Middlewares/authorization.middleware.js";

const router = Router();

router.post(
  "/add",
  auth(),
  authorization(["Company_HR"]),
  errorHandler(companyController.addCompany)
);
router.put(
  "/update/:id",
  auth(),
  authorization(["Company_HR"]),
  errorHandler(companyController.updateCompany)
);
router.delete(
  "/delete/:id",
  auth(),
  authorization(["Company_HR"]),
  errorHandler(companyController.deleteCompany)
);
router.get(
  "/getCompany/:id",
  auth(),
  authorization(["Company_HR"]),
  errorHandler(companyController.getCompany)
);
router.get(
  "/searchCompany",
  auth(),
  authorization([ "User" ,"Company_HR"]),
  errorHandler(companyController.searchCompany)
);
router.get(
  "/getapps",
  auth(),
  authorization(["Company_HR"]),
  errorHandler(companyController.getApps)
);

export default router;
