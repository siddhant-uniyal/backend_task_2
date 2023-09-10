
//this file will have middleware setup (here that is express.json())
//i have also defined the routing by using flashcardRouter


import express from "express";
export const app = express();

app.use(express.json())
import fetch from "node-fetch"
import flashcardRouter from "./routes/flashcard_route.js"
import {config} from "dotenv"
config({
    path : "./data/config.env",
})

app.use(flashcardRouter)
