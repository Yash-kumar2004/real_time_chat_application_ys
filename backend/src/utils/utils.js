import JWT from "jsonwebtoken"

 const generateToken=(userid,res)=>{
   const token= JWT.sign(
    {userid},
    process.env.JWT_SECRET,
    {expiresIn:"7d"}
    )

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        sameSite: "Strict",   
        httpOnly: true,       

        secure:process.env.NODE_ENV != "development"
    })

    return token
}

export default generateToken