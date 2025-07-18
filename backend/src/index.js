import express, { json } from  "express"
import authRoutes from "../src/routes/auth.route.js"
import messageRoutes from "../src/routes/message.route.js"
import dotenv from "dotenv"
import connectDB from "./lib/db.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config({})
const app=express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(cookieParser())

const PORT=process.env.PORT || 3000




app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

connectDB()
app.listen(PORT,()=>{
    console.log(`app is listening at PORT ${process.env.PORT || 3000}`);
    console.log(`http://localhost:${process.env.PORT || 3000}`);
    
})