import express from "express"
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/User.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/jwt.js"

const router = express.Router()

router.get('/check', verifyToken, (req, res) => {
    res.send('hello user you are logged in')
})
router.get('/checkuser/:id', verifyUser, (req, res) => {
    res.send('hello user you are logged in and you can delete your accaunt')
})
router.get('/checkadmin/:id', verifyAdmin, (req, res) => {
    res.send('hello admin  you can delete all accaunts')
})



router.get('/', verifyToken, getAllUsers)
router.get('/user', getUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)


export default router