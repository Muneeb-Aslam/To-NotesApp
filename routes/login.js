const bodyparser=require('body-parser')
const router = require('express').Router()
require("dotenv").config()
const { MongoClient } = require("mongodb");
const URL = process.env.connectionstring
// connection to database
const client = new MongoClient(URL);
client.connect();
const database = client.db("Test");


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


router.post('/register',async (req,res)=>{
    const name = req.body.name
    const username = req.body.email;
    const password = req.body.password;
    const user = { name: name,email:username,password:password};
    try {
        const collection = database.collection("Users");
        const result = await collection.insertOne(user)
        if(result.acknowledged)
            res.redirect('/login')
        else
            res.send(404)
    } catch (err) {
        console.log(err);
    }
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
});
module.exports = router