const mongoose = require('mongoose');
const slugify = require('slugify');

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A coupon must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A coupon name must have less or equal then 40 characters',
      ],
      minlength: [
        10,
        'A coupon name must have more or equal then 10 characters',
      ],
    },
    slug: String,

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    status: {
      type: String,
      enum: ['OPEN', 'FREE', 'PREMIUM'],
      default: 'OPEN',
    },
    price: {
      type: Number,
      required: [true, 'A coupon must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A coupon must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A coupon must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },

    // mongoose feature linking the users on the mongo database to this coupon model
    vendor: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

couponSchema.index({ price: 1, ratingsAverage: -1 });
couponSchema.index({ slug: 1 });

couponSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

couponSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

couponSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'vendor',
    select: '-__v -passwordChangedAt',
  });

  next();
});

const coupon = mongoose.model('coupon', couponSchema);

module.exports = coupon;
