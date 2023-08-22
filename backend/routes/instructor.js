const express = require('express')
const {
    getallinstructors,
    getinstructor,
    deleteinstructor,
    createinstructor,
    updateinstructor,
    updateAllInstructors,
    sendEmail,
    login,
    logout,
    updatepassinstructor

} = require('../controllers/instructorController')


const router = express.Router()

//GET requests
router.get('/home', (req, res) => {
    res.json({ mssg: 'GET home page' })
})
router.get('/instructor', getallinstructors)

router.get('/instructor/:id', getinstructor)

//POST requests
router.post('/instructor', createinstructor)
router.post('/instructor/login',login)

//DELETE
router.delete('/instructor/:id', deleteinstructor)

//PATCH
router.patch('/instructor/:id', updateinstructor)
router.patch('/instructor', updateAllInstructors)
router.patch('/instructor/password/:id',updatepassinstructor)

router.post("/sendemail/inst", async (req, res) => {
    const { email } = req.body;
    const {id} = req.params
    try {
      const send_to = email;
      const sent_from = process.env.EMAIL_USER;
      const reply_to = email;
      const subject = "Thank You Message From E-learning Team";
      const message = `
      <h3>Hello </h3>
      <p>Please change your password from this link  http://localhost:3000/forgotpassword </p>
      <p>Regards...</p>
      `;

      await sendEmail(subject, message, send_to, sent_from, reply_to);
      res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  router.post("/sendemail/indiv", async (req, res) => {
    const { email } = req.body;
    const {id} = req.params
    try {
      const send_to = email;
      const sent_from = process.env.EMAIL_USER;
      const reply_to = email;
      const subject = "Thank You Message From E-learning Team";
      const message = `
      <h3>Hello </h3>
      <p>Please change your password from this link  http://localhost:3000/forgotpassword</p>
      <p>Regards...</p>
      `;

      await sendEmail(subject, message, send_to, sent_from, reply_to);
      res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
      



module.exports = router