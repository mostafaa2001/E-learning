const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const CorporateTrainee = require('../models/coporateTrainee')
const validator = require('validator')
const nodemailer = require("nodemailer");


const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {

    const transporter = nodemailer.createTransport({

      host: process.env.EMAIL_HOST,

      port: "587",

      auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS,

      },

      tls: {

        rejectUnauthorized: false,

      },

    });
    const options = {

        from: sent_from,
  
        to: send_to,
  
        replyTo: reply_to,
  
        subject: subject,
  
        html: message,
  
      };
  
   
  
      // Send Email
  
      transporter.sendMail(options, function (err, info) {
  
        if (err) {
  
          console.log(err);
  
        } else {
  
          console.log(info);
  
        }
  
      });
  
    };

    const updatepassinstructor = async (req,res) =>{
        const {id} = req.params
        
        const salt = await bcrypt.genSalt();
        const body = await bcrypt.hash(req.body.Password, salt);
        console.log(body)
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'No such coorp'})
        }
         
        const instructor = await CorporateTrainee.findOneAndUpdate({_id:id},{
            ...{Password:body}
        })
        if(!CorporateTrainee){
            return res.status(400).json({error:'No such coorp'})
        }
        res.status(200).json(instructor)
    }
//function to get all coorp
const getallcorp = async(req,res) =>{
    const corp = await CorporateTrainee.find({}).sort({createdAt: -1})
    res.status(200).json(corp)
}
//function to get an coorp
const getcorp = async(req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such coorprate'})
    }
   const corp = await CorporateTrainee.findById(id)

   if(!CorporateTrainee){
    return res.status(404).json({error: 'No such coorprate'})
   }
   res.status(200).json(corp)
}
//function to delete a coorpart
const deletecorp = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such cooprate'})
    }
    const corp = await CorporateTrainee.findOneAndDelete({_id: id})
    if(!CorporateTrainee){
        return res.status(400).json({error:'No such coorprate'})
    }
    res.status(200).json(corp)
}
//function to create a cooraprate
const createcorp = async (req,res) => {
    // const{ Fname , Lname, Email ,  Password   } = req.body
    // //add course to db
    // try{
    //     const corp = await CorporateTrainee.create({ Fname , Lname, Email ,  Password})
    //     res.status(200).json(corp)
    // }catch(error){
    //     res.status(400).json({error: error.message})
    // }
    const { Fname, Lname, Email, Password} = req.body;
    // console.log(req.body)
    try {
       
        if (!Email || !Password || !Fname || !Lname ) {
            throw Error('All fields must be filled')
          }
          if (!validator.isEmail(Email)) {
            throw Error('Email not valid')
          }
          if (!validator.isStrongPassword(Password)) {
            throw Error('Password not strong enough')
          }
        
          else{

          
       await CorporateTrainee.findOne({ Email: req.body.Email }).then (async(user)=> {
            console.log(user)
          
            if (user) {
                throw Error('User already exist')
                // return res.status(400).json({ msg: "User already exist" })
               
                //  return res.status(400).json({ msg: "User not exist" })

            }
            else {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(Password, salt);
                const user = await CorporateTrainee.create({ Fname: Fname, Lname: Lname, Email: Email, Password: hashedPassword });
               

               
               
                
               
            }

        })
    }


    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
    
}

//function to update a CorporateTraineeructor
const updateCorp = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such coorprate'})
    }
    const corp = await CorporateTrainee.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!CorporateTrainee){
        return res.status(400).json({error:'No such coorprate'})
    }
    res.status(200).json(corp)
}
const updateAllCoorp = async (req,res) =>{
    // const {id} = req.params
    
    try {
     
        const coorp = await CorporateTrainee.updateMany({_v:0},{
             ...req.body
             
           // $set:{Currency:"usd"}
        })
        res.status(200).json(coorp)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}
const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'supersecret', {
        expiresIn: maxAge
    });
};



const login = async (req, res) => {
    // TODO: Login the user
    console.log("dsgfhdfg")
    try {
        const { Email, Password } = req.body
    console.log(req.body)
    if (!Email || !Password) {
        throw Error('All fields must be filled')
      }
    console.log(req.body)
    const user = await CorporateTrainee.findOne({ Email: Email })
    if (user == null) {
        throw Error('Email not correct')
      
        
    }
        if (await bcrypt.compare(Password, user.Password)) {
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000 });
            res.status(200).json({ id:user._id,Email,token,UserType:"coorp" , courses: user.Registered_Course })
            console.log("LOGGED IN")
            // res.status(200).json({Email, token})
        }
        else{
            console.log("wkjebdekjbdkj")
            throw Error('Password not correct')

        }
    }
    catch (error) {
        console.log("NOT hhh CORRECT")
        res.status(400).json({ error: error.message })
    }
}



module.exports = {
    getallcorp ,
    getcorp ,
    deletecorp,
    createcorp,
    updateAllCoorp,
    updateCorp,
    login,
    sendEmail,
    updatepassinstructor

}