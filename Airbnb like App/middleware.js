const Listing = require("./models/listings.js");
const Review = require("./models/reviews.js");
const ExpressError = require("./utils/expressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

const axios = require('axios');
const apiKey = '7ChPVwYFDS9Gow0WMrp3';

const islogged = async (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "User Must be logged in");
        return res.redirect("/login");
    }
    next();
}

const saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

const isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have permissions to perform this operation");
        return res.redirect("/listings");
    }

    next();
}

const isReviewAuthor = async (req, res, next) => {
    let { reviewid, id } = req.params;
    let review = await Review.findById(reviewid);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have permissions to perform this operation");
        return res.redirect(`/listings/${id}/show`);
    }
    next();
}

const validateListing = (req, res, next) => {
    let result = listingSchema.validate(req.body);
    if(result.error) {
        throw new ExpressError(400, result.error);
    } else {
        next();
    }
}

const validateReview = (req, res, next) => {
    let result = reviewSchema.validate(req.body);
    if(result.error) {
        throw new ExpressError(400, result.error);
    } else {
        next();
    }
}

async function geocodeAddress(address) {
    try {
        const encodedAddress = encodeURIComponent(address);     
        const url = `https://api.maptiler.com/geocoding/${encodedAddress}.json?key=${apiKey}`;
        const response = await axios.get(url);

        const result = response.data.features[0];
        const coordinates = result.geometry.coordinates;

        let coor = [coordinates[0], coordinates[1]];
        const geoJson = {
                type: "Point",
                coordinates: coor, // [longitude, latitude]
        };
        return geoJson;
        
    } catch (error) {
        console.error('Error during geocoding:', error);
    }
}

async function reverseGeocode(latitude, longitude) {
    try {
        const url = `https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=${apiKey}`;       
        const response = await axios.get(url);
        const result = response.data.features[0];

        let address = result.text;
        return address;
        
    } catch (error) {
        console.error('Error during reverse geocoding:', error);
    }
}

module.exports = { islogged, saveRedirectUrl, isOwner, validateListing, validateReview, isReviewAuthor, geocodeAddress, reverseGeocode };