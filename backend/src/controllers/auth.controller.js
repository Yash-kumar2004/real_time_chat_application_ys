import cloudinary from "../lib/cloudinary.js"
import { User } from "../models/user.model.js"
import generateToken from "../utils/utils.js"
import bcrypt from "bcryptjs"
import JWT from 'jsonwebtoken' 
import { io } from "../lib/socket.js"
const signup=async (req,res)=>{
    const {fullName,email,password}=req.body

    try {
        if(!fullName || !email || !password){
            return res.status(400)
                    .json("all fields are required")
        }

        if(password.length < 6){
            return res.status(400).json({message:"password must be atleast 6 character long"})
        }

        const user=await User.findOne({email})

        if(user){
            return res.status(400).json({message:"user already exists"})
        }

        const salt=await bcrypt.genSalt(10)
        const hasedPassword=await bcrypt.hash(password, salt)

        const newUser=new User({
            fullName,
            password:hasedPassword,
            email
        })

        if(newUser){
             generateToken(newUser._id,res);
            await newUser.save()


            io.emit("newUserRegistered", {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                createdAt: newUser.createdAt,
            });


            res.status(201)
                .json({ _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
            createdAt: newUser.createdAt,
            })
        }
        else{
            return res.status(400).json({message:"invalid user data"})
        }

        

    } catch (error) {
        console.log("something went wrong while signUp",error.message);
        res.status(500)
            .json({message:"internal server error while signup"})
        
    }   
    
}
const login=async (req,res)=>{
    const {email,password}=req.body
    try {
        if(!email || !password){
             return res.status(400)
                    .json("all fields are required")
        }

        const user = await User.findOne({email})

    if(!user){
        return res.status(400)
                .json({message:"invalid user credentials"})
    }

    const isPasswordCorrect=await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
        return res.status(400)
        .json({"message":"invalid credentials"})
    }

    generateToken(user._id,res) 

     res.status(201)
        .json({
             _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500)
            .json({message:"login failed"})
    }
}
const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const updateProfile=async (req,res)=>{
    try {
        const {profilePic}=req.body
        const userid=req.user._id

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const  uploadResponse =await cloudinary.uploader.upload(profilePic)
        const updatedUser=await User.findByIdAndUpdate(userid,{
            profilePic:uploadResponse.secure_url
        },
        {new : true})

         res.status(200).json(updatedUser);



    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const checkAuth=(req,res)=>{
    try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export {signup,
        login,
        logout,
        updateProfile,
        checkAuth
}