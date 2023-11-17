import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rent } from "./Rent";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique:true })
  googleId: string;

  @Column({ nullable: true, unique:true })
  email: string;

  @Column({ nullable: true, unique:true })
  username: string;

  @Column({ nullable: true })
  imageUser: string;

  @OneToMany(() => Rent, (rent) => rent.bike)
  rents: Rent[];
}
