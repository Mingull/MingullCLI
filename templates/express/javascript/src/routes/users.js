const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("User list");
})

router.get("/new", (req, res) => {
    res.send("User new form")
})

router.route("/:id").get((req, res) => {
    res.send("User " + req.params.id)
}).put((req, res) => {

});

module.exports = router;