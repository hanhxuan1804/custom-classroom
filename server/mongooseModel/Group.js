const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    coowners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    background: {
        type: String,
        default: "https://res.cloudinary.com/dcs2ih8fj/image/upload/v1690370465/HellroomDefaultGroup.png"
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Group", GroupSchema);