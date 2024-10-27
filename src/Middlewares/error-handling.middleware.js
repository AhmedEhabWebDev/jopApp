
/**
 * @returns {function} return middleware function
 * @description make error handle
 */

export const errorHandler = (API) => {
  return (req, res, next) => {
    API(req, res, next).catch((err) => {
      // in case there is an error in API
      console.log("Error in async handler scope", err);
      res.status(500).json({
        message: "internal server error",
        err_msg: err.message,
        err_stack: err.stack
      })
    });
  };
};

