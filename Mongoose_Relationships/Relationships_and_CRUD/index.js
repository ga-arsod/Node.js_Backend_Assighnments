const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
    return mongoose.connect( 
        "mongodb+srv://Gaurav:gapars12@cluster0.krruz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
};

//section schema
//1. creating section schema
const sectionSchema = new mongoose.Schema(
    {
        name : {type: String, required: true}
    },
    {
        versionKey : false,
        timestamps : true
    }
);

// 2. creating model
const Section = mongoose.model("section", sectionSchema);


// Books schema 
// 1. creating books schema
const booksSchema = new mongoose.Schema(
    {
        name : {type: String, required: true},
        body : {type: String, required: true},
        // section : {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "section",
        //     required: true
        // }
    },
    {
        versionKey : false,
        timestamps : true
    }
);

// 2. creating model
const Book = mongoose.model("book", booksSchema);


// Authors Schema
// 1. creating author schema 
const authorSchema = new mongoose.Schema( 
    {
        first_name : {type: String, required: true},
        last_name : {type: String, required: false},
        // book : {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "book",
        //     required: true
        // }
    },
    {
        versionKey : false,
        timestamps : true
    }
);

// 2. author model
const Author = mongoose.model("author", authorSchema);


// assignment conditions
// 1 Condition - find all books written by an author
app.get("/authors/:id", async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).lean().exec();

        return res.status(200).send({author: author});
    }
    catch(err) {
        return res.status(500).send({message: err.message})
    }
})


// 2 condition - find books in a section
app.get("/sections/:id", async (req, res) => {
    try {
        const section = await Section.findById(req.params.id).lean().exec();

        return res.status(200).send({section: section});
    }
    catch(err) {
        return res.status(500).send({message: err.message})
    }
})

// 3 condition - find books in a section that are not checked out
// 4 condition - find books of 1 author inside a section Optional
// 5 condition - find books that are checked out ( This is optional as if you skipped the CheckedOut model then you will not be able to do this )



// the below 

// posting section, books and authors data
// app.post("/sections", async (req, res) => {
//     try {
//         const section = await Section.create(req.body)

//         return res.status(201).send(section);
//     }
//     catch(err) {
//         return res.status(500).send({message: err.message})
//     }
// })

// app.post("/books", async (req, res) => {
//     try {
//         const book = await Book.create(req.body)

//         return res.status(201).send(book);
//     }
//     catch(err) {
//         return res.status(500).send({message: err.message})
//     }
// })

// app.post("/authors", async (req, res) => {
//     try {
//         const author = await Author.create(req.body)

//         return res.status(201).send(author);
//     }
//     catch(err) {
//         return res.status(500).send({message: err.message})
//     }
// })


// //getting section, authors and books data by their id's
// app.get("/sections/:id", async (req, res) => {
//     try {
//         const section = await Section.findById(req.params.id).lean().exec();

//         return res.status(200).send({section: section});
//     }
//     catch(err) {
//         return res.status(500).send({message: err.message})
//     }
// })

// app.get("/books/:id", async (req, res) => {
//     try {
//         const book = await Book.findById(req.params.id).lean().exec();

//         return res.status(200).send({book: book});
//     }
//     catch(err) {
//         return res.status(500).send({message: err.message})
//     }
// })

// app.get("/authors/:id", async (req, res) => {
//     try {
//         const author = await Author.findById(req.params.id).lean().exec();

//         return res.status(200).send({author: author});
//     }
//     catch(err) {
//         return res.status(500).send({message: err.message})
//     }
// })


// // updating section, books and authors data by their id's
// app.patch("/sections/:id", async(req, res) => {
//     try {
//         const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
//             new: true
//         }).lean().exec();

//         return res.status(201).send({section: section})
//     }
//     catch(err) {
//         return res.status(500).send({message: err.message});
//     }
// })

// app.patch("/books/:id", async(req, res) => {
//     try {
//         const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
//             new: true
//         }).lean().exec();

//         return res.status(201).send({book: book})
//     }
//     catch(err) {
//         return res.status(500).send({message: err.message});
//     }
// })

// app.patch("/authors/:id", async(req, res) => {
//     try {
//         const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
//             new: true
//         }).lean().exec();

//         return res.status(201).send({author: author})
//     }
//     catch(err) {
//         return res.status(500).send({message: err.message});
//     }
// })


// //deleting the section or books or authors document

// app.delete("/section/:id", async(req, res) => {
//     try{
//         const section = await Section.findByIdAndDelete(req.params.id).lean().exec();

//         return res.status(200).send(section)
//     }
//     catch(err) {
//         return res.status(500).send({message: err.message});
//     }
// })

// app.delete("/books/:id", async(req, res) => {
//     try{
//         const book = await Book.findByIdAndDelete(req.params.id).lean().exec();

//         return res.status(200).send(book)
//     }
//     catch(err) {
//         return res.status(500).send({message: err.message});
//     }
// })

// app.delete("/authors/:id", async(req, res) => {
//     try{
//         const author = await Author.findByIdAndDelete(req.params.id).lean().exec();

//         return res.status(200).send(author)
//     }
//     catch(err) {
//         return res.status(500).send({message: err.message});
//     }
// })





app.listen(5500, async () => {
    try {
        await connect();
    }
    catch(err) {
        console.log("Errorrrrr", err);
    }
    console.log("listening to port 3500 for CRUD operation");
})