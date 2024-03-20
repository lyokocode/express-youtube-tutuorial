import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";
import slugify from "slugify";
import { User } from "./User.js";

export const Blog = sequelize.define('Blog', {
    slug: {
        type: DataTypes.STRING,
    },
    title: {
        type: DataTypes.STRING,

    },
    content: {
        type: DataTypes.TEXT,
    },
    excerpt: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
    },
    tags: {
        type: DataTypes.STRING,
    },
    views: {
        type: DataTypes.STRING,
    },
    likes: {
        type: DataTypes.STRING,
    },
    comments: {
        type: DataTypes.STRING,
    },

}, {
    indexes: [
        {
            fields: ['title']
        }
    ]
});

Blog.belongsTo(User, { foreignKey: "UserId" });
User.hasMany(Blog);
