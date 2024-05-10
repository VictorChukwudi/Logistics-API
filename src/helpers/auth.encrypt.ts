import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";


dotenv.config();
const { JWT_SECRET} = process.env;
export class Encrypt {
  static async encryptPassword(password: string) {
    return await bcrypt.hash(password,10);
  }
  static async comparePassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password,hashPassword)
  }

  static async generateToken(payload: string | object | Buffer) { 
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}