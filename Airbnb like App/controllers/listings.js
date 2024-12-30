const Listing = require("../models/listings.js");
const {geocodeAddress, reverseGeocode} = require("../middleware.js");

module.exports.index = async (req, res) => {
    const listings = await Listing.find({});
    res.render('homepage.ejs', {listings});
}

module.exports.renderNewForm = async(req, res) => {
    res.render("addListing.ejs");
}

module.exports.createNewListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let address = `${req.body.listings.location}, ${req.body.listings.country}`;
    let coor = await geocodeAddress(address);

    const newListing = new Listing(req.body.listings);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = coor;
    await newListing.save();

    req.flash("successMsg", "Listing Created Successfully");
    res.redirect("/listings");
}

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: 'reviews', populate : {path: 'author'}}).populate('owner');
    if(!listing) {
        req.flash("errorMsg", "Page you requested for does not exists");
        return res.redirect("/listings");
    }
    res.render("showListing.ejs", {listing});
}

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("errorMsg", "Listing Does not Exists");
        res.redirect("/listings");
    }

    let originalUrl = listing.image.url;
    let modifiedUrl = originalUrl.replace("/upload", "/upload/h_200,w_250");
    res.render("editListing.ejs", {listing, modifiedUrl});
}

module.exports.editListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listings});

    if(typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    res.redirect(`/listings/${id}/show`);
}

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("deleteMsg", "Listing Deleted Successfully");
    res.redirect("/listings");
}