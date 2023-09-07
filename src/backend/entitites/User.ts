import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rent } from "./Rent";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 15, unique: true })
    alias: string;

    @Column({ nullable: false, length: 50 })
    mail: string;

    @Column({ nullable: false, length: 20 })
    phone: string;

    @OneToMany(() => Rent, (rent) => rent.bike)
    rents: Rent[];
}