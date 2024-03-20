import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const User = sequelize.define('User', {
    fullName: {
        type: DataTypes.STRING,

    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    emailToken: {
        type: DataTypes.STRING,
    },
    profilePicture: {
        type: DataTypes.STRING,
    },
    bio: {
        type: DataTypes.TEXT,
    },
    website: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    birthDate: {
        type: DataTypes.DATEONLY,
    },
    gender: {
        type: DataTypes.STRING,
    },
    phoneNumber: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.JSONB,
    },
    interests: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    occupation: {
        type: DataTypes.STRING,
    },
    education: {
        type: DataTypes.STRING,
    },
    relationshipStatus: {
        type: DataTypes.ENUM('single', 'in_relationship', 'engaged', 'married', 'divorced', 'widowed', 'complicated'),
    },
    socialMedia: {
        type: DataTypes.JSONB,
    },
    skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    hobbies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['userName']
        }
    ]
});