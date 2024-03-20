import express from "express"
import { login, logout, register } from "../controllers/Auth.js"
// import { login, logout, register, verifyMail } from "../controllers/Auth.js"

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
// router.get('/verify/:token', verifyMails)

export default router