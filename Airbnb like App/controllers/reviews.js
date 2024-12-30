const Listing = require("../models/listings.js");
const Review = require('../models/reviews.js');

module.exports.createNewReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.reviews);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}/show`)
}

module.exports.destroyReview = async(req, res) => {
    let {id, reviewid} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewid}});
    await Review.findByIdAndDelete(reviewid);

    res.redirect(`/listings/${id}/show`);
}