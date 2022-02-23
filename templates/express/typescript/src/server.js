"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express_1.default.static("src/public"));
app.get("/", (req, res) => {
    res.render("index", { name: 'world' });
});
app.use('/users', routes_1.userRouter);
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
