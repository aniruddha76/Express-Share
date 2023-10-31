const express = require("express");
const path = require("path");
const multer = require("multer");

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

app.get("/", (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, "./index.html"));
    // res.send("Server is online");
});

app.post("/upload", upload.single("file"),(req, res) =>{
    res.send(`file uploaded successfully!<br />Your File Number is: <h3>${req.file.filename}</h3>`);
});

app.get("/download", (req, res) => {
    res.send("Download is working!");
});

app.listen(PORT, (error) => {
    if(!error){
        console.log("server running smoothly on port: " + PORT);
    } else {
        alert("Error, Something went wrong with the server: " + error);
    }
});