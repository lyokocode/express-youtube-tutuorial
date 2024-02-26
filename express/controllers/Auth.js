import { User } from "../models/User.js";
import bcrypt from "bcryptjs"


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

