const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, "./index.html"));
    // res.send("Server is online");
});

app.listen(PORT, (error) => {
    if(!error){
        console.log("server running smoothly on port: " + PORT);
    } else {
        alert("Error, Something went wrong with the server: " + error);
    }
});