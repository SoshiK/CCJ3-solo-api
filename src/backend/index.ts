import dbconfig from "./ormconfig"
import { createConnection, ConnectionOptions } from "typeorm"
import express from "express"
import { Router } from "express"
import bcrypt from "bcrypt";
import Post from "./entity/PostModel"
import User from "./entity/UserModel"
import cors from "cors"
const app = express();
const routes = Router();

const connect = async () => {
    const connection = await createConnection(dbconfig as ConnectionOptions ) ;
    console.log("Suceessfully Connect to DB!!");
    return Promise.resolve(connection);
}

connect().then((connection) => {
    // GET-/api/todo/:userid
    const getTodo = async (req, res) => {
        const userId = req.params.userid;
        const result = await connection
            .getRepository(Post)
            .createQueryBuilder("post")
            .innerJoinAndSelect("post.user","user")
            .where("user.id=:id")
            .setParameters({ id: userId})
            .getMany();
        res.json(result);
    };
    //POST - /api/todo/:userid
    const createTodo = async (req, res) => {
        const userId = req.params.userid;
        const bodyData = req.body;
        const userData = await connection
            .getRepository(User)
            .findOne(userId);
        const newPost = new Post();
        newPost.text = bodyData.text;
        newPost.user = userData;
        newPost.isDone = false;
        await connection.getRepository(Post).save(newPost)
        res.json({result: true})
    }
    //PATCH - /api/todo/postid
    const updateTodo = async (req, res) => {
        const postId = req.params.postid;
        const bodyData = req.body;
        await connection
            .getRepository(Post)
            .update(postId, bodyData)
        res.json({result: true})
    }
    //DELETE - /api/todo/:postid
    const deleteTodo = async (req, res) => {
        const postId = req.params.postid;
        await connection
            .getRepository(Post)
            .delete(postId);
        res.json({result: true});
    }
    //POST - /api/user
    const authUser = async (req, res) => {
        const { username, password } = req.body;
        const user : User = await connection
            .getRepository(User)
            .findOne({ username: username });
        const match = await bcrypt.compare(password, user.passwordHash);
        if(!match) {
            res.json({result: false});
        } 
        res.json(user);
    }
    const registerUser = async (req, res) => {
        const { username, password } = req.body;
        const newUser = new User();
        newUser.username = username;
        const saltRound = 10;
        newUser.passwordHash = await bcrypt.hash(password, saltRound);
        await connection
            .getRepository(User)
            .save(newUser);
        res.json({result: true});
    }

    //routeのセット
    routes.get("/api/todo/:userid",getTodo);
    routes.post("/api/todo/:userid",createTodo);
    routes.patch("/api/todo/:postid",updateTodo);
    routes.delete("/api/todo/:postid",deleteTodo);
    routes.post("/api/user",authUser);
    routes.post("/api/user/new", registerUser);
    //ミドルウェア関数の登録
    app.set("view engine","ejs");
    app.use(cors());
    app.use(express.json());
    app.use((req,res,next) => {
        console.log(req.path);
        next();
    })
    app.use(routes);
    //サーバー起動
    app.listen(3000,() => {
        console.log(`The server has started on the port : 3000`);
    });
});
