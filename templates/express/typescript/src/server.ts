import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { userRouter } from "./routes";
dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("src/public"));

app.get("/", (req: Request, res: Response) => {
    res.render("index", { name: 'world' })
});

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})