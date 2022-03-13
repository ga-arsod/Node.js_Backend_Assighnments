const express = require("express");
const Submission = require("../models/submission.model");

const router = express.Router();


//fetch all students who gave a particular evaluation
router.get("/:evalID", async (req, res) => {

    try{
        const findStudent = await Submission.find({evaluationID: {$eq: req.params.evalID}}).populate("evaluationID").populate("studentID").lean().exec();

        return res.status(200).send(findStudent);
    }
    catch(err) {
        return res.status(500).send(err);
    }
})

module.exports = router