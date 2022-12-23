const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewController.getOverview);

router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignUpForm);

// router.get('/', authController.isLoggedIn, viewController.getOverview);

// router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
// router.get('/signup', authController.isLoggedIn, viewController.getSignUpForm);

router.get('/me', authController.protect, viewController.getAccount);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);

module.exports = router;
