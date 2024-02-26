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

