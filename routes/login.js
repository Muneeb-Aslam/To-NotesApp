const bodyparser = require("body-parser");
const router = require("express").Router();
require("dotenv").config();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const passport = require('passport')
const initialize = require('../config/passport')


router.get("/", (req, res) => {
    res.render("login");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/forgot", (req, res) => {
    res.render("forgot");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/login", (req,res,next)=>
    {passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureRedirect:'/login',
    failureFlash:true})(req,res,next)
    });

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    let errors = [];
    if (!name || !email || !password) {
        errors.push({ msg: "Fill all the Fields" });
    }
    if (errors.length > 0)
        res.render("register", { errors, name, email, password });
    else {
        User.findOne({ email: email }).then((user) => {
            if (user) {
                errors.push({ msg: "User Already Exists" });
                res.render("register", { errors, name, email, password });
            } else {
                const newUser = new User({ name, email, password });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then((user) => {
                            req.flash('success_msg',"You are now resgistered successfully")
                            res.redirect('login')
                        });
                    });
                });
            }
        });
    }
});



module.exports = router;
