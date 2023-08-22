const express = require('express')
const {
    createCourse,
    getCourses,
    getCourse,
    deleteCourse,
    updateCourse,
    updateAllCourse,
    getlastCourse
} = require('../controllers/courseController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// router.use(requireAuth)
//GET requests
router.get('/home',(req,res) => {
    res.json({mssg:'GET home page'})
})
router.get('/course',getCourses)

router.get('/course/:id',getCourse)

router.get('/course/:idi/last',getlastCourse)

//POST requests
router.post('/course',createCourse)

//DELETE
router.delete('/course/:id', deleteCourse)

//PATCH
router.patch('/course/:id',updateCourse)
router.patch('/course',updateAllCourse)




module.exports = router