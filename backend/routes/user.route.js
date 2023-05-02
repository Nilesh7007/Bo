const express = require("express")

const {UserModel}= require("../model/User.model")

const jwt =  require("jsonwebtoken")

const bcrypt = require("bcrypt");

const UserRouter = express.Router();


UserRouter.post("/register", async(req,res)=>{

    const {name,email,password,city,age}= req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=>
         {
            const user = new UserModel({name,email,password:hash,city,age})

            await user.save()
            res.status(200).send({"msg":"New user has been register"})
        });
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

UserRouter.post("/login", async(req,res)=>{

    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})

        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{

                if(result){
                    const token = jwt.sign({ userID:user._id,user:user.name }, 'masai');

                    res.status(200).json({"msg":"login succecefully","token":token})
                }
                else{
                    res.status(200).send({"msg":"wrong credentials"})
                }
            })

        }
        else{
            res.status(200).send({"msg":"wrong credentials"})
        }
    } catch (error) {
        res.status(400).json({"msg":error.message})
    }
})

module.exports = {UserRouter}