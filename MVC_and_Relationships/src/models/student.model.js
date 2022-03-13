const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema (
    {
        rollID : {type: String, required: true},
        userID : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        currBatchID : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "batch",
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = mongoose.model("student", studentSchema);