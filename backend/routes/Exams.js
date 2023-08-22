const express = require('express')
const {
    getExamsAll,
    getExam,
    deleteExam,
    createExam,
    updateExam,
    updateAllExams
} = require('../controllers/Exams')


const router = express.Router()

//GET requests

 router.get('/solveExam',getExamsAll)

 router.get('/indiv/:idi/:idc/solveExam/:ide',getExam)

 router.get('/coorp/:idi/:idc/solveExam',getExamsAll)

 router.get('/solveExam/:id/:ide',getExam)
//  '/api/coorp/solveExam/' + exid

//POST requests
router.post('/instructor/:id/createExam',createExam)

//DELETE
// router.delete('/course/:id', deleteCourse)

//PATCH
// router.patch('/course/:id',updateCourse)
// router.patch('/course',updateAllCourse)




module.exports = router