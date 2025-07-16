import express, { json } from  "express"
import authRoutes from "../src/routes/auth.route.js"
import dotenv from "dotenv"
import connectDB from "./lib/db.js"
dotenv.config({})
const app=express()

app.use(express.json())

const PORT=process.env.PORT || 3000

app.use("/api/auth",authRoutes)

connectDB()
app.listen(PORT,()=>{
    console.log(`app is listening at PORT ${process.env.PORT || 3000}`);
    console.log(`http://localhost:${process.env.PORT || 3000}`);
    
})