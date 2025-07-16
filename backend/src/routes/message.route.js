import { Router } from "express";
import { protectroute } from "../middlewares/auth.middleware.js"; 
import {getUsersForSideBar} from "../controllers/message.controller.js"
const router=Router()

router.route("/users").get(protectroute,getUsersForSideBar)