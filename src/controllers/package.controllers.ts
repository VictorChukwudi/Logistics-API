import {Request, Response} from "express"
import { UserService } from "../services/user.services"
import { PackageService } from "../services/package.services"
import { PackageDto } from "../dtos"
import cron from "node-cron"

export class PackageController{
    static async submitPackage(req: Request, res: Response){
        try {
            const { packageName, pickupDate, recipient} = req.body
            const userId = req["user"].id
            const user = await UserService.findUserById(userId)

            const submitPackage = await PackageService.createPackage(user, packageName, pickupDate,recipient)

            const responseDto = new PackageDto()
            responseDto.id = submitPackage.id
            responseDto.packageName =submitPackage.packageName
            responseDto.pickupDate = submitPackage.pickupDate
            responseDto.status = submitPackage.status
            responseDto.recipient = submitPackage.recipient
            responseDto.timestamp = submitPackage.timestamp

            res.status(201).json({
                status:"success",
                message:"Package submitted.",
                data: responseDto
            })
        } catch (error) {
            res.status(500).json({
                status:"error",
                message:error.message
            })
        }
    }

    static async trackPackage(req: Request, res: Response){
        try {
            const { packageId } = req.params
            const packageData = await PackageService.getOnePackage(packageId)

            if(!packageData){
                return res.status(404).json({
                    status:"error",
                    message:"Package not found."
                })
            }

            const responseDto = new PackageDto()
            responseDto.id = packageData.id
            responseDto.packageName = packageData.packageName
            responseDto.pickupDate = packageData.pickupDate
            responseDto.status = packageData.status
            responseDto.recipient = packageData.recipient
            responseDto.timestamp = packageData.timestamp
            
            res.status(200).json({
                status:"success",
                message:"Package tracked.",
                data: responseDto
            })
        } catch (error) {
            res.status(500).json({
                status:"error",
                message:error.message
            })
        }
    }

    static async automateStatusUpdate(req: Request, res: Response){
        try {
            const packageId = req.params.packageId
            const packageData = await PackageService.getOnePackage(packageId)
            if(!packageData){
                return res.status(404).json({
                    status:"error",
                    message:"Package not found."
                })
            }
            
            let isRunning = false;
            const updateStatus = async (packageId:string) => {
                const packageData = await PackageService.getOnePackage(packageId);
                if (packageData.status === "out-for-delivery") {
                  task.stop();
                  return;
                }
            
                if (packageData.status === "pending") {
                  await PackageService.updatePackage(packageId, "in-transit");
                } else if (packageData.status === "in-transit") {
                  await PackageService.updatePackage(packageId, "out-for-delivery");
                }
                isRunning = false;
              };

              const task = cron.schedule('*/2 * * * *', async () => {
                if (isRunning) return; // Prevent multiple executions within 2 minutes
                isRunning = true;
                await updateStatus(packageId);
              });
            
              task.start();
            
            res.status(200).json({
                status:"success",
                message:`Package ${packageId} status update started.`
            })
        } catch (error) {
            console.log(error);
            
            res.status(500).json({
                status:"error",
                message:error.message
            })
        }
    }

    static async getAllPackages(req: Request, res: Response){
        try {
            const userId = req["user"].id
            const user = await UserService.findUserById(userId)
            const packages = await PackageService.getAllPackages()
            let fetchedPackages=[];

            const responseDto = new PackageDto()
            packages.forEach((packageData) => {
                responseDto.id = packageData.id
                responseDto.packageName = packageData.packageName
                responseDto.pickupDate = packageData.pickupDate
                responseDto.status = packageData.status
                responseDto.recipient = packageData.recipient
                responseDto.timestamp = packageData.timestamp

                fetchedPackages.push(responseDto)
            })
            res.status(200).json({
                status:"success",
                message:"Packages fetched.",
                data: fetchedPackages
            })
        } catch (error) {
            res.status(500).json({
                status:"error",
                message:error.message
            })
        }
    }
}