import express from "express"
import { sequelize } from "./database/db.js"
import dotenv from "dotenv"
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"

const app = express()
dotenv.config()


app.use(express.json())

// routes
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)


app.use("/", (req, res) => {
    res.send("server is running")
})


const main = async () => {
    try {
        await sequelize.sync(
            // { force: true }
        )
        console.log("db connection is successfull")
        app.listen(process.env.PORT, () => console.log(`api is running on port:${process.env.PORT}`))
    } catch (error) {
        console.log(`unable to connect to database ${error}`)
    }
}

main()