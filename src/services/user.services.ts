import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Encrypt } from "../helpers/auth.encrypt";


export class UserService{
    static async registerUser(firstname: string, lastname: string, email: string, password: string){
        const passwordHash= await Encrypt.encryptPassword(password)

        const user = new User()
        user.firstname= firstname
        user.lastname= lastname
        user.email = email
        user.password = passwordHash

        const userRepository = AppDataSource.getRepository(User)
       return await userRepository.save(user)
    }

    static async loginUser(email: string, password: string){
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({email})
        const isUser = await Encrypt.comparePassword(password, user.password)
        return isUser ? user : false;
    }

    static async findUser(email: string){
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({email})
        return user
    }
}