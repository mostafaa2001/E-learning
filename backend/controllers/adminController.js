
const mongoose = require('mongoose')
const admin = require('../models/admin')
const validator = require('validator')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');


const addAdmin = async (req,res) => {
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

          
       await admin.findOne({ Email: req.body.Email }).then (async(user)=> {
            console.log(user)
          
            if (user) {
                throw Error('User already exist')
                // return res.status(400).json({ msg: "User already exist" })
               
                //  return res.status(400).json({ msg: "User not exist" })

            }
            else {
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(Password, salt);
                const user = await admin.create({ Fname: Fname, Lname: Lname, Email: Email, Password: hashedPassword });
               

               
               
                
               
            }

        })
    }


    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
    
}

const updateAllAdmin = async (req,res) =>{
    // const {id} = req.params
    
    try {
     
        const coorp = await admin.updateMany({_v:0},{
             ...req.body
             
           // $set:{Currency:"usd"}
        })
        res.status(200).json(coorp)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}
const updateAdmin = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Admin'})
    }
    const adm = await admin.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!Admin){
        return res.status(400).json({error:'No such Admin'})
    }
    res.status(200).json(adm)
}

const getalladmin = async(req,res) =>{
    const corp = await admin.find({}).sort({createdAt: -1})
    res.status(200).json(corp)
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
    const user = await admin.findOne({ Email: Email })
    if (user == null) {
        throw Error('Email not correct')
      
        
    }
        if (await bcrypt.compare(Password, user.Password)) {
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000 });
            res.status(200).json({ id:user._id,Email,token,UserType:"admin"  })
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


module.exports= {addAdmin,updateAllAdmin,getalladmin,updateAdmin,login}