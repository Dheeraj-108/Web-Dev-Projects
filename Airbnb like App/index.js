if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/expressError.js");
// const mongoUrl = "mongodb://127.0.0.1:27017/nomadtrip";
const DbUrl = process.env.ATLASDB_URL;
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const User = require("./models/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const user = require("./routes/user.js");

app.set('view engine', 'ejs');
app.set("views", [
    path.join(__dirname, "views"),
    path.join(__dirname, "views/listings"),
    path.join(__dirname, "views/users")
]);
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

const store = MongoStore.create({
    mongoUrl: DbUrl,
    crypto : {
        secret: process.env.SECRET_COOKIE,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Error in Mongo Session");
})

const sessionOptions = {
    store,
    secret : process.env.SECRET_COOKIE,
    resave : false,
    saveUninitialized : true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

async function main() {
    await mongoose.connect(DbUrl);
}

main().then((res) => {
    console.log("Connected to the Dabatase");
}).catch((err) => {
    console.log("Error connecting with Database: ", err);
})

// app.get("/", (req, res) => {
//     res.send("Welcome to Home Page!");
// })

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("successMsg");
    res.locals.deleteMsg = req.flash("deleteMsg");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.get("/createuser", async(req, res) => {
    let demoUser = new User({
        username: "Dheeraj",
        email: "Dheerajemail@email.com",
    })

    let registeredUser = await User.register(demoUser, "password123");
    res.send(registeredUser);
})

//Listing
app.use("/listings", listings);

//Reviews
app.use("/listings/:id/reviews", reviews) 

//Users
app.use("/", user);

//Error Handlers
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})

app.use((err, req, res, next) => {
    let {status = 500, message = "Something Went Wrong"} = err;
    res.status(status).render("error.ejs", {message});
})

app.listen(8080, () => {
    console.log("App is listening");
});