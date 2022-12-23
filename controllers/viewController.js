const Coupon = require('../models/couponModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  const coupons = await Coupon.find();

  res.status(200).render('overview', {
    title: 'All Coupon',
    coupons,
  });
});

exports.getCoupon = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findOne({ slug: req.params.slug });

  if (!coupon) {
    return next(new AppError('There is no coupon with that name.', 404));
  }

  res.status(200).render('coupon', {
    title: `${coupon.name} Coupon`,
    coupon,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getSignUpForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign Up',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyCoupons = catchAsync(async (req, res, next) => {
  const couponIDs = bookings.map((el) => el.coupon);

  const coupons = await Coupon.find({ _id: { $in: couponIDs } });

  res.status(200).render('overview', {
    title: 'My Coupons',
    coupons,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
