import express from "express"
import { sequelize } from "./database/db.js"
import dotenv from "dotenv"
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"
import blogRoute from "./routes/blog.js"

const app = express()
dotenv.config()


app.use(express.json())

// routes
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/blogs", blogRoute)

app.use((err, req, res, next) => {

    const errorStatus = err.status || 500
    const errorMessage = err.message || "Someting went wrong!"

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })

})


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