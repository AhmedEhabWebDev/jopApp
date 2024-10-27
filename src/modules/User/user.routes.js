import { Router } from "express";
import * as userController from "./user.controller.js";
import { auth } from "../../Middlewares/authentication.middleware.js";
import { errorHandler } from "../../Middlewares/error-handling.middleware.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { getAllUserSchema, getAnotherUserSchema, SignInSchema, SignUpSchema, updatePassSchema, updateSchema } from "./user.schema.js";

const router = Router();

router.post('/signUp', validationMiddleware(SignUpSchema) , errorHandler(userController.signUp))
router.post('/signIn',validationMiddleware(SignInSchema) , errorHandler(userController.signIn))
router.put('/update', auth(), validationMiddleware(updateSchema) ,errorHandler(userController.updateUser))
router.patch('/updatePass', auth() , validationMiddleware(updatePassSchema) , errorHandler(userController.updatePass))
router.delete('/delete', auth() , errorHandler(userController.deleteUser))
router.get('/getUser', auth() , errorHandler(userController.getUser))
router.get('/getAnotherUser/:_id', validationMiddleware(getAnotherUserSchema) , errorHandler(userController.getAnotherUser))
router.get('/getAllUser', validationMiddleware(getAllUserSchema) , errorHandler(userController.getAllUser))

export default router;
