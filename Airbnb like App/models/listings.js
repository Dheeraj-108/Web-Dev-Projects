const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        enum: ['Mountain', 'Room', 'Arctic', 'Farm', 'Camping'],
    },
    image: {
        // default: "https://plus.unsplash.com/premium_photo-1680303134459-912abf8efe2f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // type: String,
        // set: (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1680303134459-912abf8efe2f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    owner : {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(!listing.reviews) {
        let res = await Review.deleteMany({_id : {$in : listing.reviews}});
        console.log("Deleted Result: ", res);
    }
})

const Listing = mongoose.model("listing", listingSchema);
module.exports = Listing;