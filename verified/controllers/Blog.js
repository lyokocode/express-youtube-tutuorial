import { Blog } from "../models/Blog.js"
import { User } from "../models/User.js"
import { createError } from "../utils/error.js"

export const getAllBlogs = async (req, res, next) => {
    const { userId } = req.query
    let blogs;
    try {
        if (userId) {
            blogs = await Blog.findAll({
                where: { UserId: userId },
                include: {
                    model: User,
                    attributes: ['fullName']
                }
            })
        } else {
            blogs = await Blog.findAll({
                include: {
                    model: User,
                    attributes: ['fullName']
                }
            })
        }
        if (!blogs || blogs.length === 0) return next(createError(404, 'user or blog not defined'))
        res.status(200).json(blogs)
    } catch (err) {
        next(err)
    }
}

export const getBlog = async (req, res, next) => {
    const { slug } = req.query
    try {

        const blog = await Blog.findOne({
            where: { slug },
            include: {
                model: User,
                attributes: ['fullName']
            }
        })

        if (!blog) return next(createError(404, "blog not found"))

        res.status(200).json(blog)

    } catch (err) {
        next(err)
    }
}
export const createBlog = async (req, res, next) => {
    const { ...blogInfo } = req.body
    try {

        const newBlog = await Blog.create({ ...blogInfo })
        res.status(201).json(newBlog)
    } catch (err) {
        if (err.message.includes("Blogs_UserId_fkey")) {
            return next(createError(404, 'user not defined'))
        }
        next(err)
    }
}

export const deleteBlog = async (req, res, next) => {
    const { id } = req.params
    try {
        const blog = await Blog.findByPk(id)

        if (!blog) return next(createError(404, "blog not found"))

        await Blog.destroy({
            where: {
                id: blog.id
            }
        })

        return res.status(204).json({ message: "blog has been deleted" })
    } catch (err) {
        next(err)

    }
}


export const updateBlog = async (req, res, next) => {
    const { id } = req.params
    const updatedFields = req.body
    try {
        const blog = await Blog.findByPk(id)

        if (!blog) return next(createError(404, "blog not found"))

        Object.keys(updatedFields).forEach((field) => {
            if (field !== 'id') {
                blog[field] = updatedFields[field]
            }
        })

        await blog.save()

        res.json(blog)
    } catch (err) {
        next(err)
    }
}