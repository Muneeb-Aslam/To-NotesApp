const bodyparser=require('body-parser')
const router = require('express').Router()
require("dotenv").config()
const User = require('../model/user')
const bcrypt = require('bcryptjs')


router.get('/',(req,res)=>{
    res.render('login')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/forgot',(req,res)=>{
    res.render('forgot')
})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post("/login", async (req, res) => {
    const username = req.body.email;
    const password = req.body.password;
    const user = { name: username };
    console.log(user);
    // // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
    // try {
    //     const collection = database.collection("Users");
    //     const user = await collection.findOne({ name: username });
    //     if (user != null) {
    //         if (user["password"] == password) {
    //             res.redirect('/dashboard')
    //         } else
    //             return res.json({
    //                 status: "error",
    //                 error: "Invalid Password....",
    //             });
    //     } else {
    //         return res.json({ status: "error", error: "Invalid Username...." });
    //     }
    // } catch (err) {
    //     console.log(err);
    // }
})



router.post('/register',async (req,res)=>{
    const {name,email,password}= req.body; 
    let errors = []
    if(!name || !email || !password){
        errors.push({msg:'Fill all the Fields'})
    }

    if(errors.length>0)
        res.render('register',{errors,name,email,password})
    else
        {
            User.findOne({email:email}).then(user=>{
                console.log(user);
                if(user){
                    errors.push("User Already Exists")
                    console.log("H");
                    res.render('register',{errors,name,email,password})
                }else{
                    const newUser = new User({name,email,password})
                    
                    res.send("Add User")
                }
            })

        }
})

module.exports = router