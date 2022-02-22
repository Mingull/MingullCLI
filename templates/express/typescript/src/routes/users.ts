import { Request, Response, Router } from "express";

const express = require("express");
const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("User list");
})

router.get("/new", (req: Request, res: Response) => {
    res.send("User new form")
})

router.route("/:id").get((req: Request, res: Response) => {
    res.send("User " + req.params.id)
});

export default router;