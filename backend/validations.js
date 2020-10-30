const { validationResult, check } = require('express-validator');
const { User, Project } = require('./db/models');

const handleValidationErrors = (req, res, next) => {
  const validatorErrors = validationResult(req);
  console.log(validatorErrors);

  if (!validatorErrors.isEmpty()) {
    const errors = validatorErrors.array().map(error => error.msg);

    const err = new Error('Bad request.');
    err.status = 400;
    err.title = 'Bad Request.';
    err.errors = errors;
    return next(err);
  }
  next();
};

// TODO: Custom Validations...

// Validators below are being used in users.js and session.js in routes/api
const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please enter a valid email.")
    .isLength({ max: 55 })
    .withMessage("Email address cannot be over 55 characters long.")
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          throw new Error(
            "The provided email address is already used by another account."
          );
        }
        return true;
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please enter a valid password.")
    .isLength({ min: 8 })
    .withMessage("Password must be longer than 8 characters.")
    .custom((value) => {
      if (value.split(" ").length > 1) {
        throw new Error("Password cannot have spaces.");
      }
      return true;
    })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .withMessage(
      "Password must have at least one lower-case letter, upper-case letter, number, and special character(!@#$%^&*)."
    ),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value to confirm password.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("The password fields must match.");
      }
      return true;
    }),
];

const validateUser = [
  check("fullName")
  .exists({ checkFalsy: true })
  .withMessage("Please enter a valid name.")
  .isLength({ max: 55 })
  .withMessage("Name cannot be over 55 characters long.")
  .custom((value) => {
    if (value.split(" ").length < 2) {
      throw new Error(
        "You must enter both first name and last name, separated by a space."
      );
    }
    return true;
  })
  .matches(/^[a-zA-Z\s]+$/)
  .withMessage("Name must only contain alphabets."),
];

const userNotFoundError = id => {
  const err = new Error('User not found.');
  err.errors = [`User with id of ${id} could not be found.`];
  err.title = 'User not found';
  err.status = 404;
  return err;
};

const validateProject = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid name.')
    .isLength({ max: 55 })
    .withMessage("Name cannot be over 55 characters long."),
];

const projectNotFoundError = id => {
  const err = new Error('Project not found.');
  err.errors = [`Project with id of ${id} could not be found.`];
  err.title = 'Project not found';
  err.status = 404;
  return err;
};

const validateTask = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid name.')
    .isLength({ max: 55 })
    .withMessage("Name cannot be over 55 characters long."),
];

const taskNotFoundError = id => {
  const err = new Error('Task not found.');
  err.errors = [`Task with id of ${id} could not be found.`];
  err.title = 'Task not found';
  err.status = 404;
  return err;
};

module.exports = {
  validationResult,
  handleValidationErrors,
  validateEmailAndPassword,
  validateUser,
  userNotFoundError,
  validateProject,
  projectNotFoundError,
  validateTask,
  taskNotFoundError,
};
