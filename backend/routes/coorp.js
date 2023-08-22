const express = require('express')
const{
    getallcorp ,
    getcorp ,
    deletecorp,
    createcorp,
    updateCorp,
    updateAllCoorp,login,sendEmail,updatepassinstructor
}=require('../controllers/CoporateController')

const router = express.Router()

router.get('/coorp',getallcorp)

router.get('/coorp/:id',getcorp)

//POST requests
router.post('/coorp',createcorp)
router.post('/coorp/login',login)

//DELETE
router.delete('/coorp/:id', deletecorp)

//PATCH
router.patch('/coorp/:id',updateCorp)
router.patch('/coorp/',updateAllCoorp)
router.patch('/coorp/password/:id',updatepassinstructor)

router.post("/sendemail/:id/:cname", async (req, res) => {

    const { email } = req.body;

    const { cname } = req.params;
    try {

        const send_to = email;

        const sent_from = process.env.EMAIL_USER;

        const reply_to = email;

 

        const subject = "Congratulations, You have completed " + cname + " course";

        const message = `

      <h3>Congratulations </h3>

      <p>you have successfully completed ${cname} course Here is your certificate </p>

     

      <img src = "https://marketplace.canva.com/EAE5YGi0UX8/1/0/1600w/canva-modern-appreciation-professional-certificate-rpJZIqBW9Uc.jpg" />

      `

 

            ;

 

        await sendEmail(subject, message, send_to, sent_from, reply_to);

        res.status(200).json({ success: true, message: "Email Sent" });

    } catch (error) {

        res.status(500).json(error.message);

    }

});
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
      <p>Please change your password from this link  http://localhost:3000/forgotpassword </p>
      <p>Regards...</p>
      `;

      await sendEmail(subject, message, send_to, sent_from, reply_to);
      res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
      

// router.patch('/course',updateAllCourse)

module.exports = router