import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  IsEmail,
  Length,
  IsPhoneNumber,
  IsString,
  IsIn,
} from "class-validator";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsString()
  name!: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  @Length(6, 100)
  password!: string;

  @Column()
  @IsIn(["Admin", "Staff"])
  role!: string;

  @Column()
  @IsPhoneNumber()
  phone!: string;

  @Column()
  city!: string;

  @Column()
  country!: string;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;
}
