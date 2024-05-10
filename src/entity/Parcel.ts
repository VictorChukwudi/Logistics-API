import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Parcel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "enum", enum: ["pending", "in-transit", "delivered"], default: "pending" })
  status: string;

  @Column({ type: "date" })
  pickupDate: Date;

  @Column({ type: "timestamp" })
  timestamp: Date;

  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.parcels)
  user: User;
}