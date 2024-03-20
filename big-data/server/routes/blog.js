import express from "express"
import { blogCount, createBlog, deleteBlog, getAllBlogs, getBlog, updateBlog } from "../controllers/Blog.js"

const router = express.Router()

router.get('/', getAllBlogs)
router.get('/count', blogCount)
router.get('/blog', getBlog)
router.post('/', createBlog)
router.delete('/:id', deleteBlog)
router.put('/:id', updateBlog)


export default router