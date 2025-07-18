import { Router } from "express";
import { signup,login,logout,updateProfile,checkAuth} from "../controllers/auth.controller.js";
import { protectroute } from "../middlewares/auth.middleware.js"; 
const router=Router()


router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/update-profile").put(protectroute,updateProfile)
router.route("/check").get(protectroute,checkAuth)

export default router