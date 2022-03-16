const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.model");

const router = express.Router();

router.post("/",
body("first_name")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("First Name Cannot be empty"),
body("last_name")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("Last Name cannot be empty"),
body("email")
    .isEmail()
    .not()
    .isEmpty()
    .withMessage("Email cannot be empty")
    .custom(async (value) => {
        const user = await User.findOne({email: value});

        if(user) {
            throw new Error ("Email is already taken");
        }
        return true
     }),
body("pincode")
     .not()
     .isEmpty()
     .custom((value) => {
         const pin = /[0-9]{6}/;

         if(!value.match(pin)) {
             throw new Error ("PinCode must be of six digits only");
         }
         return true;
     }),
body("age")
     .not()
     .isEmpty()
     .withMessage("Age cannot be empty")
     .isNumeric()
     .custom((value) => {
         if(value < 1 || value > 100) {
             throw new Error("Age should be between 1 to 100");
         };
         return true;
     }),
body("gender")
     .not()
     .isEmpty()
     .withMessage("Gender cannot be empty")
     .custom((value) => {
         return true;
     }),
async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log({ errors });
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }

        const user = await User.create(req.body);

        return res.status(200).send(user);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;