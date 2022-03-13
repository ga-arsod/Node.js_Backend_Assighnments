const app = require("./index");

const connect = require("./configs/db");

app.listen(5000, async () => {
    try {
        await connect();
    }
    catch(err) {
        console.log("Errorrrrr", err);
    }
    console.log("listening to port 5000 for MVC Assignment");
})