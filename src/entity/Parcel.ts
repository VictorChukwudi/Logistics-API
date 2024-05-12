import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Parcel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  packageName: string;

  @Column({ type: "enum", enum: ["pending", "in-transit", "out-for-delivery", "delivered"], default: "pending" })
  status: string;

  @Column({ type: "date" })
  pickupDate: Date;

  @Column({type: "json"})
  recipient: { name: string, address: string, phone: string };

  @Column({ type: "timestamp with time zone", default: ()=> "CURRENT_TIMESTAMP"})
  timestamp: Date;

  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.parcels)
  user: User;
}