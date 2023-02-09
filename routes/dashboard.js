const router = require('express').Router()

router.get('/dashboard',(req,res)=>{
    return res.render('dashboard')
})
module.exports = router