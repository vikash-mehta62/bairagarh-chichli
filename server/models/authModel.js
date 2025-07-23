const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
        },
        password: {
            type: String,
            trim: true,
        },
        isvendor: {
            type: Boolean,
            default: false,
            trim: true,
        },
        isProperties: {
            type: Boolean,
            default: false,
            trim: true,
        },
        isInquiry: {
            type: Boolean,
            default: false,
            trim: true,
        },
        isBlog: {
            type: Boolean,
            default: false,
            trim: true,
        },
        isAppicatoin: {
            type: Boolean,
            default: false,
            trim: true,
        },
        isManageEmp: {
            type: Boolean,
            default: false,
            trim: true,
        },
        isJob: {
            type: Boolean,
            default: false,
            trim: true,
        },

        role: {
            type: String,
            enum: ["admin"],
            default: "admin",
        },
        token: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("auth", authSchema);
