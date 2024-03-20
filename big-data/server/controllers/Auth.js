import { User } from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js";
import { verificationMail } from "../utils/sendMail.js";
import Randomstring from "randomstring";

export const register = async (req, res, next) => {
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
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    const { userName } = req.body
    try {
        const user = await User.findOne({
            where: {
                userName
            }
        })

        if (!user) return next(createError(404, "user not found"))
        if (!user.isVerified) return next(createError(401, "Email not verify"))

        const isPsswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isPsswordCorrect) return next(createError(401, "Unauthorized 'wrong password or username'"))

        const token = jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, { expiresIn: "6h" })

        const { password, ...userInfo } = user.dataValues

        res.cookie("access_token", token, {
            httpOnly: true  //cross side scripting
        })
            .status(200).json({ ...userInfo })


    } catch (err) {
        next(err)
    }
}

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("access_token")
        res.status(200).json({ message: "logout successful" })
    } catch (err) {
        next(err)
    }
}

// export const verifyMail = async (req, res, next) => {
//     const { token } = req.params
//     try {
//         const user = await User.findOne({ where: { emailToken: token } })

//         if (!user || user.isVerified) res.status(400).json({ message: 'Invalid mail token' })

//         user.isVerified = true;
//         user.emailToken = null

//         await user.save()

//         res.status(200).json({ message: 'email verify' })

//     } catch (err) {
//         next(err)
//     }
// }