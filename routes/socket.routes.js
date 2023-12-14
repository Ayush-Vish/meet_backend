import express from "express";
import { joinRoom } from "../controllers/socket.controller.js";
const router = express.Router() ;

router.route("/")
    .get(joinRoom)
export default router ;