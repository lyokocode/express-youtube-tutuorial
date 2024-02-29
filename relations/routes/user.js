import express from "express"
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/User.js"

const router = express.Router()

router.get('/', getAllUsers)
router.get('/user', getUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)


export default router