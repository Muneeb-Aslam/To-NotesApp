const localStrategy = require('passport-local').Strategy
const User = require('../model/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

module.exports=function(passport){
    passport.use(
        new localStrategy({usernameField:'email'},(email,password,done)=>{
            User.findOne({email:email}).then(user=>{
                if(!user)
                    return done(null,false,{message:"User not exists"})
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if (err) throw err
                    if(isMatch)
                        return done(null,user)
                    else
                        return done(null,false,{message:"Incorrect Password"})
                })
            })
            .catch(err=>console.log(err))
        })
    );

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>{
            done(err,user)
        })
    })
}