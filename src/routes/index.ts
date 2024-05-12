import express from "express"
import authRoutes from "./auth.routes"
import packageRoutes from "./package.routes"
import { authenticate } from "../middlewares/authentication"

const router=express.Router()


router.use("/auth", authRoutes)
router.use("/packages", [authenticate], packageRoutes)

export default router


