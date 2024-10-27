import { Router } from "express";
import * as jobController from "./job.controller.js";
import { auth } from "../../Middlewares/authentication.middleware.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { authorization } from "../../Middlewares/authorization.middleware.js";

const router = Router();

router.post(
  "/add",
  auth(),
  authorization(["Company_HR"]),
  errorHandler(jobController.addJob)
);
router.put(
  "/update/:id",
  auth(),
  authorization(["Company_HR"]),
  errorHandler(jobController.updateJob)
);
router.delete(
  "/delete/:id",
  auth(),
  authorization(["Company_HR"]),
  errorHandler(jobController.deleteJob)
);
router.get(
  "/getAllJobs",
  auth(),
  authorization(["User", "Company_HR"]),
  errorHandler(jobController.getJobs)
);
router.get(
  "/getJobsForSpecificCompany",
  auth(),
  authorization(["User", "Company_HR"]),
  errorHandler(jobController.getJobsForSpecificCompany)
);
router.get(
  "/getJobsFilters",
  auth(),
  authorization(["User", "Company_HR"]),
  errorHandler(jobController.getJobsFilters)
);
router.post(
  "/applyJob",
  auth(),
  authorization(["User"]),
  errorHandler(jobController.applyJob)
);

export default router;
