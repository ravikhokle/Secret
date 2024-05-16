import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 80;
const __dirname = dirname(fileURLToPath(import.meta.url));

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({extended:true}));

function passwordCheck(req, res, next){
    const password = req.body["password"];
    if (password === "ravi"){
        userIsAuthorised = true;
    }
    next();
}

app.use(passwordCheck);

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res)=>{
    if (userIsAuthorised) {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else{
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})
