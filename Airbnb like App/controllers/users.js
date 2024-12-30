const User = require("../models/user.js");

module.exports.renderSignUpFrom = (req, res) => {
    res.render("signup.ejs");
}

module.exports.signUpUser = async(req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({
            email, username
        });
        let registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("successMsg", "Signed Up Successfully");
            res.redirect("/listings");
        })
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }

}

module.exports.renderLoginForm = (req, res) => {
    res.render("login.ejs");
}

module.exports.loginUser = (req, res) => {
    req.flash("successMsg", "Logged in Successfully");
    let redirectUrl = res.locals.redirectUrl || "/listings" ;
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("successMsg", "Logged out Successfully");
        res.redirect("/listings");
    });
}