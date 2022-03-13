const express = require("express");
const Result = require("../models/result.model");

const router = express.Router();


// fetch the student with his personal details who scored the highest marks in the evaluation
router.get("", async (req, res) => {
    try{
        const findTopper = await Result.find({$sort: {scored_marks: -1}}).populate(
            {
                path: "submissionID",
                populate : {path: "studentID", populate : {
                    path: "userID",
                }}
            })
            .limit(1)
            .lean().exec();

        return res.status(200).send(findTopper);
    }
    catch(err) {
        return res.status(500).send(err);
    }
})

module.exports = router