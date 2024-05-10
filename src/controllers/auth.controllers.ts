import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import { Encrypt } from "../helpers/auth.encrypt";
import { UserDto } from "../dtos";


export class AuthController{
    
    //Register User
   static async register(req: Request, res: Response){
    try {
        const {firstname, lastname, email, password}= req.body
        const findUser= await UserService.findUser(email)

        if(findUser){
            res.status(400)
            throw new Error("Email is registered already.")
        }

        const newUser = await UserService.registerUser(firstname, lastname, email, password)
        const responseDto = new UserDto()
        responseDto.id = newUser.id
        responseDto.firstname = newUser.firstname
        responseDto.lastname =newUser.lastname
        responseDto.email = newUser.email
        
        const payload ={
            id: responseDto.id,
            email: responseDto.email
        }
        const token = await Encrypt.generateToken(payload)
        res.status(201).json({
            status:"success",
            message:"User registered.",
            data:{
                ...responseDto,
                token
            }
        })
    } catch (error) {
        res.json({
            status:"error",
            message: error.message
        })
    }
   }

   //Login User
   static async login(req: Request, res: Response){
    try {
        const {email, password}= req.body
        const findUser = await UserService.findUser(email)

        if(!findUser){
            res.status(400)
            throw new Error(`User with email: ${email} does not exist. Please register.`)
        }

        const authenticateUser = await UserService.loginUser(email, password)
        if(!authenticateUser){
            res.status(400)
            throw new Error("Invalid login credentials.")
        }else{
            const payload={
                id: authenticateUser.id,
                email: authenticateUser.email
            }
            const token = await Encrypt.generateToken(payload)

            const responseDto = new UserDto()
            responseDto.id = authenticateUser.id
            responseDto.firstname = authenticateUser.firstname
            responseDto.lastname = authenticateUser.lastname
            responseDto.email = authenticateUser.email

            res.status(200).json({
                status:"success",
                message:"Logged in.",
                data:{
                    ...responseDto,
                    token
                }
            })
        }
    } catch (error) {
        res.json({
            status:"error",
            message: error.message
        })
    }
   }
}