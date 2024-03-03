
import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js"
import slugify from "slugify";
import { User } from "./User.js";

export const Blog = sequelize.define('Blog', {
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('title', value)
            this.setDataValue('slug', slugify(value, { lower: true }))
        }
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

})

Blog.belongsTo(User, { foreignKey: "UserId" })
User.hasMany(Blog)


