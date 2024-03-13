const express = require('express');
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
  getMyTours,
  alerts,
  getSignUpForm,
} = require('../controllers/viewsController');

const { isLoggedIn, protect } = require('../controllers/authController');

const router = express.Router();

router.use(alerts);

router.get('/', isLoggedIn, getOverview);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/me', protect, getAccount);
router.get('/my-tours', protect, getMyTours);
router.get('/signup', getSignUpForm);

router.post('/sumbit-user-data', protect, updateUserData);

module.exports = router;
