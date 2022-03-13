const mongoose = require("mongoose");


const resultSchema = new mongoose.Schema (
    {
        scored_marks : {type: Number, required: true},
        submissionID : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "submission",
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Result = mongoose.model("result", resultSchema);

module.exports = Result;