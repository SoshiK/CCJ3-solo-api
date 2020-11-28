import { Factory, Seeder } from "typeorm-seeding"
import { Connection } from "typeorm"
import User from "../entity/UserModel"

export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                   id:  "b12f9390-aeb0-11ea-b3de-0242ac130004",
                   username: "test user",
                   passwordHash: " $2b$10$MpzeCqWoFtTVc3H.t6jJEuXXXZcPOzCl2oPiIi9M41C2X0TMn38Ne"
                }
            ])
            .execute()
    }
}