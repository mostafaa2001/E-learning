const mongoose = require('mongoose')
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Inst = require('../models/instructor')
var isLogged = false;
const validator = require('validator')
//function to get all instructors
const getallinstructors = async(req,res) =>{
    const instructors = await Inst.find({}).sort({createdAt: -1})
    res.status(200).json(instructors)
}
//function to get an instructor
const getinstructor = async(req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such instructor'})
    }
   const instr = await Inst.findById(id)
 
   if(!instr){
    return res.status(404).json({error: 'No such instructor'})
   }
   res.status(200).json(instr)
}
//function to encrypt
const EncryptNew = async (req,res) =>{
    const{Password} = req.body

}


//function to delete a instructor
const deleteinstructor = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such instructor'})
    }
    const instr = await Inst.findOneAndDelete({_id: id})
    if(!Inst){
        return res.status(400).json({error:'No such instructor'})
    }
    res.status(200).json(instr)
}
//function to create a instructor
const createinstructor = async (req,res) => {
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

          
       await Inst.findOne({ Email: req.body.Email }).then (async(user)=> {
            console.log(user)
          
            if (user) {
                throw Error('User already exist')
                // return res.status(400).json({ msg: "User already exist" })
               
                //  return res.status(400).json({ msg: "User not exist" })

            }
            else {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(Password, salt);
                const user = await Inst.create({ Fname: Fname, Lname: Lname, Email: Email, Password: hashedPassword });
               

               
               
                
               
            }

        })
    }


    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }

 
}
 
//function to update a instructor
const updateinstructor = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such instructor'})
    }
    const instructor = await Inst.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!Inst){
        return res.status(400).json({error:'No such instructor'})
    }
    res.status(200).json(instructor)
}
const updatepassinstructor = async (req,res) =>{
    const {id} = req.params
   
    const salt = await bcrypt.genSalt();
    const body = await bcrypt.hash(req.body.Password, salt);
    console.log(body)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such instructor'})
    }
     
    const instructor = await Inst.findOneAndUpdate({_id:id},{
        ...{Password:body}
    })
    if(!Inst){
        return res.status(400).json({error:'No such instructor'})
    }
    res.status(200).json(instructor)
}
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
  const updateAllInstructors = async (req,res) =>{
    // const {id} = req.params
    
    try {
     
        const instructor = await Inst.updateMany({_v:0},{
             ...req.body
             
           // $set:{Currency:"usd"}
        })
        res.status(200).json(instructor)
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
    try {
        const { Email, Password } = req.body
    console.log(req.body)
    if (!Email || !Password) {
        throw Error('All fields must be filled')
      }
    console.log(req.body)
    const user = await Inst.findOne({ Email: Email })
    if (user == null) {
        throw Error('Email not correct')
      
        
    }
        if (await bcrypt.compare(Password, user.Password)) {
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000 });
            res.status(200).json({ id:user._id,Email,token,UserType:"instructor" , courses: user.Registered_Course })
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

const logout = async (req, res) => {
    // TODO Logout the user
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1 });
    isLogged = false;
}


module.exports = {
    getallinstructors ,
    getinstructor ,
    deleteinstructor,
    createinstructor,
    updateinstructor,
    updateAllInstructors,
    updatepassinstructor,
    sendEmail,
    logout,
    login,
   
    
 
}