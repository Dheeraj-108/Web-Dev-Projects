const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { islogged, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    islogged,
    upload.single("listings[image]"),
    validateListing,
    wrapAsync(listingController.createNewListing)
  );

router.route("/:id/edit").get(
    islogged,
    isOwner,
    wrapAsync(listingController.renderEditForm)
  ).put(
    islogged,
    isOwner,
    upload.single("listings[image]"),
    validateListing,
    wrapAsync(listingController.editListing)
  )

router.get("/new", islogged, listingController.renderNewForm);

router.get("/:id/show", wrapAsync(listingController.showListing));

router.delete(
  "/:id/delete",
  islogged,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
