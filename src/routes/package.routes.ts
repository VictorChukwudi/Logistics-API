import express from "express"
import { PackageController } from "../controllers/package.controllers"
import validate from "../middlewares/validation"
import { packageSchema } from "../helpers/validators"


const router=express.Router()

router.post("/submit", [validate(packageSchema)], PackageController.submitPackage)
router.get("/:packageId", PackageController.trackPackage)
router.post("/:packageId/update", PackageController.automateStatusUpdate)
export default router