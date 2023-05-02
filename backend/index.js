const express = require("express")
const app = express()
app.use(express.json())
const {connection} = require("./db");
require('dotenv').config()

const {UserRouter} = require("./routes/user.route")
const {auth} = require("./middleware/auth.midd")

const {ArtRouter} = require("./routes/art.route")


app.use("/users",UserRouter)

app.use(auth)

app.use("/articles",ArtRouter)


app.listen(process.env.port, async()=>{

    try {
       await connection 
       console.log("connected to atlas BlogDB!!!!!!!")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server runs on port ${process.env.port}`)
})
