const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        first_name: {type: String, required: true},
        last_name: String,
        email: {type: String, required: true},
        pincode: {type: String, required: true},
        age: {type: Number, required: true},
        gender: {
            type: String,
            enum: ["Male", "Female", "Others"],
            default: "Male",
            required: true
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("user", userSchema);