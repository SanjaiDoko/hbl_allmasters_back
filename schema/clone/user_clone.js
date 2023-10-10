let mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

//User Clone Schema
let userSchemaClone = mongoose.Schema({
    originalId: {
        type: ObjectId,
        required: true,
        ref: "user"
    },
    actionType: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    actionMessage: {
        type: String,
        trim: true
    },
    fullName: {
        type: String,
        trim: true
    },
    legalName: {
        type: String,
        trim: true
    },
    data: {
        type: Object,
        required: true,
        trim: true
    },
    status: {
        type: Number
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("userClone", userSchemaClone)
