const express = require("express");

const app = express();


// This API prints the "Fetching all books"
app.get("/books", allBooks(), (req, res) => {
    res.json("Fetching all books")
})

function allBooks() {
    return function logger(req, res, next) {
        console.log("Fetching all books");
        next();
    }
}



// This API prints the {BookName: req.name} in form of Json.
app.get("/book/:name", singleBook(), (req,res) => {
    let data = {
        bookName : req.name
    }

    res.json(data)
})

function singleBook() {
    return function logger(req, res, next) {
        req.name = req.params.name;
        // console.log(req.name);
        next();
    }
}




app.listen(4444, () => {
    console.log("Listening to 4444");
})