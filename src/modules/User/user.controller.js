import jwt from "jsonwebtoken";
import { compareSync, hashSync } from "bcrypt";
import User from "../../../DB/models/user.model.js";

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { message, user }
 * @description create new user
 */

export const signUp = async (req, res, next) => {
  // destruct data from req.body
  const {
    firstName,
    lastName,
    email,
    password,
    recoveryEmail,
    DOB,
    mobileNumber,
    role,
    status,
  } = req.body;

  // check if the email is already exists
  const isEmailExists = await User.findOne({ email });
  if (isEmailExists)
    return res.status(409).json({ message: "email already exist" });

  // hash password

  const hashPass = hashSync(password, process.env.SALT_ROUNDS);

  // create new user instance
  const userInstance = new User({
    firstName,
    lastName,
    email,
    password: hashPass,
    recoveryEmail,
    DOB,
    mobileNumber,
    role,
    status,
  });

  // creat User

  const user = await User.create(userInstance);

  // send response
  res.status(201).json({ message: "User created", user });
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, token }
 * @description User logIn 
 */

export const signIn = async (req, res) => {
  // destruct email and password from req.body
  const { email, password } = req.body;
  // find user
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ message: "invalid email or password" });

  // compare password
  const isMatch = compareSync(password, user.password);

  if (!isMatch)
    return res.status(404).json({ message: "invalid email or password" });

  // generate the access token
  const token = jwt.sign({ userId: user._id }, process.env.LOGIN_SECRET);

  const updateStatus = await User.updateOne({ email }, { status: "online" });

  // response
  res.status(200).json({ message: "Login success", token });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { message, updatedUser }
 * @description update user
 */

export const updateUser = async (req, res, next) => {
  // destruct data from req.body
  const { firstName, lastName, email, recoveryEmail, DOB, mobileNumber } =
    req.body;

  // destruct _id from req.authUser
  const { _id } = req.authUser;

  // find and update user
  const updatedUser = await User.findOneAndUpdate(
    { _id },
    {
      firstName,
      lastName,
      email,
      recoveryEmail,
      DOB,
      mobileNumber,
    },
    { new: true }
  );

  // response
  res.status(200).json({ msg: "User updated", updatedUser });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { message, deletedUser }
 * @description delete user
 */

export const deleteUser = async (req, res, next) => {
  // destruct _id from req.authUser
  const { _id } = req.authUser;

  // find and delete user
  const deletedUser = await User.findOneAndDelete({ _id });

  // response
  res.status(200).json({ msg: "User deleted", deletedUser });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { message, user }
 * @description get user
 */

export const getUser = async (req, res, next) => {

  // destruct _id from req.authUser
  const { _id } = req.authUser;

  // find user
  const user = await User.findOne({ _id });

  // response
  res.status(200).json({ msg: "get User seccussefully", user });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { message, user }
 * @description get another user
 */

export const getAnotherUser = async (req, res, next) => {
  // destruct _id from req.params
  const { _id } = req.params;

  // find user
  const user = await User.findOne({ _id });

  // response
  res.status(200).json({ msg: "get Another User seccussefully", user });
};

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} return response { message, user }
 * @description update password
 */

export const updatePass = async (req, res, next) => {
  // destruct password from req.body
  const { password } = req.body;

  // destruct _id from req.authUser
  const { _id } = req.authUser;

  // hash password
  const hashPass = hashSync(password, process.env.SALT_ROUNDS);

  // find user and update password
  const user = await User.findOneAndUpdate(
    { _id },
    { password: hashPass },
    { new: true }
  );

  // response
  res.status(200).json({ msg: "updated Password", user });
};

/**
 * @param {object} req
 * @param {object} res
 * @returns {object} return response { message, user }
 * @description get all users by recoveryEmail
 */

export const getAllUser = async (req, res) => {

  // destruct recoveryEmail from req.query
  const { recoveryEmail } = req.query;

  // find user by recoveryEmail
  const user = await User.find({ recoveryEmail });

  // response
  res.status(200).json({ msg: "get all User seccussefully", user });
};
