//this file exists for keeping the code clean
//contains all the routes that we will make in this app , for this task only one route is sufficient
//what actually happens in the routing is defined in the controller files

import express from "express"
import fetch from "node-fetch"
import { makeFlashcard } from "../controllers/flashcard_controller.js"

const router = express.Router();


router.get("/words/:word" , makeFlashcard)

export default router