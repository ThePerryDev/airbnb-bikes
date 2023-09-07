import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Brand } from "./Brand"
import { Photo } from "./Photo";
import { Category } from "./Category";
import { User } from "./User";
import { Rent } from "./Rent";

export type Gender = "masculino" | "feminino" | "unissex";
export type Material = "aluminio" | "carbono" | "ferro";

@Entity({ name: "bikes" })
export class Bike {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 30 })
    color: string;

    @Column({ nullable: false, length: 10 })
    size: string;

    @Column({
        nullable: false, type: "enum",
        enum: ["aluminio", "carbono", "ferro"],
    })
    material: Material;

    @Column({
        nullable: false,
        type: "enum",
        enum: ["masculino", "feminino", "unissex"],
    })
    gender: Gender;

    @Column({ nullable: false })
    speedkit: number;

    @Column({ nullable: false, length: 10 })
    aro: string;

    @Column({ nullable: false })
    suspensao: boolean;

    @Column({ nullable: false })
    hourlyvalue: number;

    @Column({ nullable: false })
    dailyvalue: number;

    @Column({ nullable: false, length: 200 })
    description: string;

    @ManyToOne(() => Brand)
    @JoinColumn({ name: "idbrand" })
    brand: Brand;

    @ManyToOne(() => Category)
    @JoinColumn({name: "idcategory"})
    category: Category

    @OneToMany(() => Photo, (photo) => photo.bike)
    photos: Photo[];

    @ManyToOne(() => User)
    @JoinColumn({name: "iduser"})
    user: User;

    @OneToMany(() => Rent, (rent) => rent.bike)
    rents: Rent[];
}