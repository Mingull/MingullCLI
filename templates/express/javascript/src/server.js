require("dotenv").config();
const express = require("express");
const { userRouter } = require("./routes");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("src/public"));

app.get('/', (req, res) => {
    res.render("index", { name: 'world' })
});

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})