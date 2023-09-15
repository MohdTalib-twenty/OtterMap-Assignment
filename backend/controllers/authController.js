const User = require("../models/userModels")
const jwt = require('jsonwebtoken')
const bcryptjs =require("bcryptjs")
const genreateToekn=async(id)=>{
    return await jwt.sign({userId : id},process.env.JWT_SECRET,{expiresIn : '1d'});
}
const comparePassword=async(password,hashedPassword)=>{
    const isMatch = await bcryptjs.compare(password,hashedPassword)
     return isMatch
}
const Register=async(req,res,next)=>{
    try {
        const {name,email,password}=req.body
        if(!name){
            next("Name is required")
        }
        if(!email){
            next("Email is required")
        }
        if(!password){
            next("Password is required")
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            next("Email already registered please login")
        }
        
        
        const user = await new User(req.body)
        const token =await genreateToekn(User._id)
        await user.save();
        return res.status(200).send({
            success : true,
            message : "Registration successfull",
            user:{
                name : user.name,
                email : user.email,
            },
            token
        })

    } catch (error) {
        next(error)
    }

}


const Login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            next("Please Enter all the fields")
        }
        const findUser = await User.findOne({email})
        if(!findUser){
            next("Invalid Username or Password")
        }
        const isMatch= await comparePassword(password,findUser.password)
        if(!isMatch){
            next("Invalid Password")
        }
        const token =await genreateToekn(findUser._id)
        findUser.password = undefined;
        res.status(200).send({
            success : true,
            message : "Login successfully",
            findUser,
            token
        })
    } catch (error) {
        next(error)
    }
}
module.exports={Register,Login}