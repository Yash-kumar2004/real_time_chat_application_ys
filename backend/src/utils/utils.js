import JWT from jsonwebtoken

const generateToken=(userid,res)=>{
    JWT.sign(
    {userid},
    process.env.JWT_SECRET,
    {expiresIn:"7d"}
    )
}