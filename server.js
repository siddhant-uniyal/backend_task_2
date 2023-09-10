
//this file is just for setting up the server
//imports app



import { app } from "./app.js"



app.get("/" , (req,res)=>{
    res.send("Welcome , enter a word in address bar")
})

app.listen(process.env.PORT , (req,res)=>{
    console.log(`Server is working on port : ${process.env.PORT}`)
})