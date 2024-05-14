import { AppDataSource } from "../data-source";
import { Parcel } from "../entity/Parcel";
import { User } from "../entity/User";

export class PackageService {
    static async createPackage(user: User, packageName: string, pickupDate: Date, 
        recipient:{name: string, address: string, phone: string}){
        const  parcel = new Parcel();

        parcel.packageName = packageName;
        parcel.pickupDate = pickupDate;
        parcel.recipient = recipient;
        parcel.user = user

        const parcelRepository = AppDataSource.getRepository(Parcel)
        return await parcelRepository.save(parcel);
    }

    static async getOnePackage(id: string){
        const parcelRepository = AppDataSource.getRepository(Parcel)
        const parcel = await parcelRepository.findOneBy({id})
        return parcel
    }

    static async updatePackage(id: string, status: string){
        const parcelRepository = AppDataSource.getRepository(Parcel)
        const parcel = await parcelRepository.findOneBy({id})
        parcel.status = status || parcel.status

        return await parcelRepository.save(parcel)
    }

    static async getAllPackages(){
        const parcelRepository = AppDataSource.getRepository(Parcel)
        const parcels = await parcelRepository.find()
        return parcels
    }
}