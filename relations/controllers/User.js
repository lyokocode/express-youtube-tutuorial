import { User } from "../models/User.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import { Blog } from "../models/Blog.js"

// GET ALL USERS
export const getAllUsers = async (req, res, next) => {

    try {
        const users = await User.findAll({
            include: {
                model: Blog,
                attributes: ['title', 'slug']
            }
        })

        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

export const getUser = async (req, res, next) => {
    const { userName } = req.query
    try {

        const user = await User.findOne({
            where: { userName },
            include: {
                model: Blog,
                attributes: ['title', 'slug']
            }
        })

        if (!user) return next(createError(404, "user not found"))

        res.status(200).json(user)

    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await User.findByPk(id)

        if (!user) return next(createError(404, "user not found"))


        await Blog.destroy({
            where: {
                UserId: user.id
            }
        })

        await User.destroy({
            where: {
                id: user.id
            }
        })

        return res.status(204).json({ message: "user has been deleted" })
    } catch (err) {
        next(err)

    }
}

export const updateUser = async (req, res, next) => {
    const { id } = req.params
    const updatedFields = req.body
    try {
        const user = await User.findByPk(id)

        if (!user) return next(createError(404, "user not found"))

        if (updatedFields.password) {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(updatedFields.password, salt)
            user.password = hash
        }
        Object.keys(updatedFields).forEach((field) => {
            if (field !== 'id' && field !== 'password') {
                user[field] = updatedFields[field]
            }
        })

        await user.save()

        const { password, ...userInfo } = user.dataValues
        res.json({ user: userInfo })
    } catch (err) {
        next(err)
    }
}

