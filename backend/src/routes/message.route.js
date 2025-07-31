import { Router } from "express";
import { protectroute } from "../middlewares/auth.middleware.js"; 
import {getUsersForSideBar,getmessages,sendMessage} from "../controllers/message.controller.js"
const router=Router()

router.route("/users").get(protectroute,getUsersForSideBar)
router.route("/:id").get(protectroute,getmessages)
router.route("/send/:id").post(protectroute,sendMessage)


export  default router