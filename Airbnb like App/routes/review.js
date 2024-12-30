const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
  islogged,
  isReviewAuthor,
  validateReview,
} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

router.post(
  "/",
  islogged,
  validateReview,
  wrapAsync(reviewController.createNewReview)
);

router.delete(
  "/:reviewid",
  islogged,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
