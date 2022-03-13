const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
    return mongoose.connect( 
        "mongodb+srv://Gaurav:gapars12@cluster0.krruz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
};

// 1. user schema 
const userSchema = new mongoose.Schema(
    {
        firstName : {type: String, required: true},
        lastName : {type: String, required : true}
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const User = mongoose.model("user", userSchema);


const sectionSchema = new mongoose.Schema(
    {
        name : {type: String, required: true}
    },
    {
        versionKey: false,
        timestamps: true
    }
)
const Section = mongoose.model("section", sectionSchema);


const bookSchema = new mongoose.Schema(
    {
        sectionID : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "section",
            required: true
        },
        name: {type: String, required: true},
        body: {type: String, required: true}
    },
    {
        versionKey: false,
        timestamps: true
    }
)
const Book = mongoose.model("book", bookSchema);


const authorSchema = mongoose.Schema(
    {
        userID : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
const Author = mongoose.model("author", authorSchema);


const book_authorSchema = mongoose.Schema (
    {
        authorID : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "author",
            required: true
        },
        bookID : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book",
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
const BookAuthor = mongoose.model("book_author", book_authorSchema);


const checkedOutSchema = mongoose.Schema(
    {
        userID : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        bookID : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book",
            required: true
        },
        checkeOutTime : {type: String},
        checkedInTime : {type: String}
    },
    {
        versionKey: false,
        timestamps: true
    }
)
const CheckAvailability = mongoose.model("checkAvailability", checkedOutSchema);


//find all books written by an author
app.get("/book_authors", async (req, res) => {
    try{
        const book_author = await BookAuthor.find({}).populate(authorID).lean().exec();

        return res.status(200).send(book_author);
    }
    catch(err) {
        return res.status(500).send(err)
    }
}) 


//find books in a section
app.get("/books/:id", async (req, res) => {
    try{
        const books = await BookAuthor.find({sectionID: {$eq : req.params.id}}).populate(sectionID).lean().exec();

        return res.status(200).send(books);
    }
    catch(err) {
        return res.status(500).send(err);
    }
})


//find books in a section that are not checked out
app.get("/available", async(req, res) => {
    try{
        const available = await CheckAvailability.find({$or: [{checkeOutTime: {$eq : null}}, {checkeOutTime: {$lt : checkedInTime}}]});

        return res.status(200).send(available);
    }
    catch(err) {
        return res.status(500).send(err);
    }
})


//find books of 1 author inside a section Optional
app.get("/book_authors/:id", async (req, res) => {
    try{
        const book_author = await BookAuthor.find({authorID: {$eq : req.params.id}}).populate(bookID).lean().exec();

        return res.status(200).send(book_author);
    }
    catch(err) {
        return res.status(500).send(err)
    }
}) 


//find books that are checked out ( This is optional as if you skipped the CheckedOut model then you will not be able to do this )
app.get("/available", async(req, res) => {
    try{
        const available = await CheckAvailability.find({$and: [{checkeOutTime: {$ne : null}}, {checkeOutTime: {$gt : checkedInTime}}]});

        return res.status(200).send(available);
    }
    catch(err) {
        return res.status(500).send(err);
    }
})


app.listen(5500, async () => {
    try {
        await connect();
    }
    catch(err) {
        console.log("Errorrrrr", err);
    }
    console.log("listening to port 3500 for CRUD operation");
})