import { User } from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    try {

        const newUser = await User.create({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
        })
        return res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
    }
}


export const login = async (req, res) => {
    const { userName } = req.body
    try {
        const user = await User.findOne({
            where: {
                userName
            }
        })

        if (!user) return console.log("user not found")

        const isPsswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isPsswordCorrect) return console.log("wrong password or username")

        const token = jwt.sign({
            id: user.id,
            userName: user.userName
        }, process.env.JWT_SECRET, { expiresIn: "6h" })

        const { password, ...userInfo } = user.dataValues

        res.cookie("access_token", token, {
            httoOnly: true
        })
            .status(200).json({ ...userInfo })


    } catch (error) {
        console.log(`there is a error from login:${error}`)
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("access_token")
        res.status(200).json({ message: "logout successful" })
    } catch (error) {
        console.log(`there is a error from logout: ${error}`)
    }
}