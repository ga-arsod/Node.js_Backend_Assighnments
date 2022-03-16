
let app = require("./index");

let connect = require("./configs/db")

app.listen(4444, async() => {
    try{
        connect();
    }
    catch(err) {
        console.log(err);
    }
    console.log("listening to the port 4444");
})