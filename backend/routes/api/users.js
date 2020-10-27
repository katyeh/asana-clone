const express = require('express');
const { checkSchema } = require('express-validator');

const { User } = require('../../db/models');
const { asyncHandler, hashPassword } = require('../../utils');
const { handleValidationErrors, validateUser, validationResult, userNotFoundError, validateEmailAndPassword } = require('../../validations');
const { authenticated, generateToken } = require('./security-utils');

const router = express.Router();

router.get(
  '/',
  validateUser,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.json({ users });
  })
);

router.post(
  '/',
  validateUser,
  validateEmailAndPassword,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    let { fullName, email, password, picUrl } = req.body;

    const hashedPassword = await hashPassword(password.trim());

    fullName = fullName.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');

    if (!picUrl) {
      picUrl = "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({ status: 422, errors: errors.array() });
    }

    const user = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      picUrl,
      hashedPassword
    });

    const { jti, token } = generateToken(user);
    user.tokenId = jti;
    await user.save();
    res.json({ token, user: user.toSafeObject() });
    })
);

router.get('/me', authenticated, (req, res) => {
  res.json({
    email: req.user.email,
    name: req.user.name,
  });
});

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    // TODO: Must validate token to check if the user has authority to delete the user info!!

    const user = await User.findOne({
      where: { id: req.params.id },
    });

    // if (user) {
      res.json({ user: { fullName: user.fullName, email: user.email, picUrl: user.picUrl, id: user.id } });
    // } else {
      // next(userNotFoundError(req.params.id));
    // }
  }));

  router.delete(
    '/:id(\\d+)',
    asyncHandler(async (req, res, next) => {
    // TODO: Must validate token to check if the user has authority to delete the user info!!

    const user = await User.findOne({
      where: { id: req.params.id },
    });

    if (user) {
      await user.destroy();
      res.json({ message: `Deleted user with id of ${user.id}.` });
    } else {
      next(userNotFoundError(req.params.id));
    }
  }));

  router.post("/token",
  validateEmailAndPassword,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (!user || !user.validatePassword(password)) {
      const err = new Error("Login failed.");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }

    const token = getUserToken(user);
    res.json({token, user: { id: user.id, picUrl: user.picUrl, fullName: user.fullName, username: user.username } });
}));

module.exports = router;
