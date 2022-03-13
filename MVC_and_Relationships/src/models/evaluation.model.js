const mongoose = require("mongoose");


const evaluationSchema = new mongoose.Schema (
    {
        dateOfEvaluation : {type: String, required: true},
        instructor : {type: String, required: true},
        batchID : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "batch",
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Evaluation = mongoose.model("evaluation", evaluationSchema);

module.exports = Evaluation;