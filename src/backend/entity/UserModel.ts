import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Post from "./PostModel";

@Entity({name: "users"})
class User {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({unique: true})
    public username: string;

    @Column({name:"passwordhash"})
    public passwordHash: string;

    @OneToMany(type => Post, post => post.user)
    public posts: Post[]
}

export default User;