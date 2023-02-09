const router = require('express').Router()

router.get('/forgot',(req,res)=>{
    return res.render('forgot')
})
module.exports = router