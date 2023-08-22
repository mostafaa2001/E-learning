const express = require('express')
const {
    createSubtitle,
    updateSub,
    getsubtitles
   
} = require('../controllers/SubtitleController')
 

const router = express.Router()
 
//GET requests
router.get('/home',(req,res) => {
    res.json({mssg:'GET home page'})
})

 
//POST requests
router.post('/subtitle', createSubtitle)
 router.patch('/subtitle/:id',updateSub)
router.get('/subtitle',getsubtitles)



module.exports = router
