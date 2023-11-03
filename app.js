const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb){
        let randomNumber = Math.floor(Math.random() * 10000);
        return cb(null, `${randomNumber}-${file.originalname}`);
    },
});

const upload = multer({storage: storage});
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.text({ type: "text/html" }));

app.get("/", (req, res) => {
    res.status(200);
    res.render("index.html");
    // res.sendFile(path.join(__dirname, "./index.html"));
    // res.send("Server is online");
});

app.post("/upload", upload.single("file"),(req, res) =>{
    res.send(`file uploaded successfully!<br />Your File Number is: <h3>${req.file.filename}</h3>`);
});

app.get("/download", (req, res) => {
    let name = req.query.inputValue;
    res.sendFile(path.join(__dirname, `./uploads/${name}`));
    // res.sendFile(path.join(__dirname, "./uploads/6014-1.jpg"));
});

app.listen(PORT, (error) => {
    if(!error){
        console.log("server running smoothly on port: " + PORT);
    } else {
        alert("Error, Something went wrong with the server: " + error);
    }
});