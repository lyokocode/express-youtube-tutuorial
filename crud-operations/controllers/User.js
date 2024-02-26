import { User } from "../models/User.js";

// GET ALL USERS
export const getAllUsers = async (req, res, next) => {

    try {
        const users = await User.findAll()

        res.status(200).json(users)
    } catch (err) {
        console.log(err)
    }
}

export const getUser = async (req, res, next) => {
    const { userName } = req.query
    try {

        const user = await User.findOne({
            where: { userName }
        })

        if (!user) return console.log("user not found")

        res.status(200).json(user)

    } catch (error) {
        console.log(`there is a error from getUser:${error}`)
    }
}

export const deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await User.findByPk(id)

        if (!user) return console.log("user not found")

        await User.destroy({
            where: {
                id: user.id
            }
        })

        return res.json({ message: "user has been deleted" })
    } catch (error) {
        console.log(`there is a error from deleteUser:${error}`)
    }
}

export const updateUser = async (req, res, next) => {
    const { id } = req.params
    const updatedFields = req.body
    try {
        const user = await User.findByPk(id)

        if (!user) return console.log("user not found")

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
    } catch (error) {
        console.log(`there is a error from updateUser:${error}`)
    }
}
