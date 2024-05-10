import express from "express"
import { AuthController } from "../controllers/auth.controllers"
import validate from "../middlewares/validation"
import { loginSchema, registerSchema } from "../helpers/validators"



const router=express.Router()

router.post("/register", [validate(registerSchema)], AuthController.register)
router.post("/login", [validate(loginSchema)], AuthController.login)
export default router