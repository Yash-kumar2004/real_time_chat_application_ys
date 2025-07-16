import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
const signup=async (req,res)=>{
    const {fullName,email,password}=req.body

    try {
        if(password < 6){
            return res.status(400).json({message:"password must be atleast 6 character long"})
        }

        const user=User.findone({email})

        if(user){
            return res.status(400).json({message:"user already exists"})
        }

        const salt=bcrypt.genSalt(10)
        const hasedPassword=bcrypt.hash(password, salt)

        const newUser=new User({
            fullName,
            password:hasedPassword,
            email
        })

        if(newUser){
            
        }
        else{
            return res.status(400).json({message:"invalid user data"})
        }

        

    } catch (error) {
        
    }
    
}
const login=()=>{

}
const logout=()=>{

}


export {signup,
        login,
        logout       
}