const register = require("./schema")
const bcrypt = require("bcrypt")


const registerFunc = async(req,res)=>{
    try{
        const {firstname,lastname,email,password} = req.body
        const salt = bcrypt.genSalt(10)
        const hashedpassword = bcrypt.hash(password,salt)
        const register = await register.create({
            firstname:firstname,  // rigth part is the actual value which are send to the database
            lastname:lastname,
            email:email,
            password:hashedpassword
        })
    }catch(err){
        res.status(500).json({message:"err",err})
    }
}