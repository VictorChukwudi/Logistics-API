import express from "express"
import authRoutes from "./auth.routes"

const router=express.Router()


router.use("/auth", authRoutes)

export default router



// http://localhost:5400/api/auth/google/login