import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("all_users")
export class AllUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  age: number;

  @Column({
    type: "enum",
    enum: ["male", "female", "other"],
    nullable: true,
  })
  gender: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ type: "date", nullable: true })
  dob: Date;

  @CreateDateColumn({ name: "create_dt" })
  createDt: Date;

  @UpdateDateColumn({ name: "modified_dt" })
  modifiedDt: Date;

  @Column({ nullable: true })
  customer_id: string;
}
