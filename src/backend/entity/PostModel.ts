import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import User from "./UserModel";

@Entity({name:"posts"})
class Post {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
   
    @ManyToOne(type => User, user => user.posts)
    @JoinColumn({name:"userid"})
    public user: User;

    @Column()
    public text: string;

    @Column({default: false, name:"isdone"})
    public isDone: boolean;
}

export default Post;