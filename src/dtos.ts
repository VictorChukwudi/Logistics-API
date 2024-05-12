export class UserDto{
    id: string;
    firstname: string;
    lastname: string;
    email:string;
}

export class PackageDto{
    id: string;
    packageName: string;
    pickupDate: Date;
    status: string;
    recipient:{name: string, address: string, phone: string};
    timestamp: Date;
}