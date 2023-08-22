const express = require('express')
const{
    getallindiv ,
    getindiv ,
    deleteindiv,
    createindiv,
    updateindiv,
    // logout,
    login,
    signUp,
    payment,
    updatepassinstructor
}=require('../controllers/IndividualController')

const router = express.Router()

router.get('/indiv',getallindiv)

router.get('/indiv/:id',getindiv)

//POST requests
router.post('/indiv',createindiv)
router.post('/indiv/signup', signUp)
router.post('/indiv/login',login)
router.post("/create-checkout-session",payment)
//DELETE
router.delete('/indiv/:id', deleteindiv)

//PATCH
router.patch('/indiv/:id',updateindiv)
router.patch('/indiv/password/:id',updatepassinstructor)
// router.patch('/course',updateAllCourse)
router.post("/sendemail/coorp", async (req, res) => {
    const { email } = req.body;
    const {id} = req.params
    try {
      const send_to = email;
      const sent_from = process.env.EMAIL_USER;
      const reply_to = email;
      const subject = "Thank You Message From E-learning Team";
      const message = `
      <h3>Hello </h3>
      <p>Please change your password from this link  http://localhost:3000/instructor/updatepass/${id} </p>
      <p>Regards...</p>
      `;

      await sendEmail(subject, message, send_to, sent_from, reply_to);
      res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
      

module.exports = router