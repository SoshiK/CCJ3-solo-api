import { Seeder, Factory} from "typeorm-seeding";
import { Connection } from "typeorm"
import Post from "../entity/PostModel"

export default class CreateDummyPosts implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any>{
        await connection
            .createQueryBuilder()
            .insert()
            .into(Post)
            .values([{
                user:{
                    id:  "b12f9390-aeb0-11ea-b3de-0242ac130004",
                    username: "test user",
                    passwordHash: " $2b$10$MpzeCqWoFtTVc3H.t6jJEuXXXZcPOzCl2oPiIi9M41C2X0TMn38Ne"
                 },
                 text: "1st toDo"
            },{
                user:{
                    id:  "b12f9390-aeb0-11ea-b3de-0242ac130004",
                    username: "test user",
                    passwordHash: " $2b$10$MpzeCqWoFtTVc3H.t6jJEuXXXZcPOzCl2oPiIi9M41C2X0TMn38Ne"
                 },
                 text: "2nd toDo"
            }])
            .execute();
    }
}