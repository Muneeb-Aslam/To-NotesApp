const router = require('express').Router()

router.get('/',(req,res)=>{
    return res.render('login')
})


module.exports = router