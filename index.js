import express from "express"
import multer from "multer"
import path from "path"
import { fileURLToPath } from 'url';
import session from "express-session";
import MongoStore from "connect-mongo";
import mongo from "./config"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT
const app = express()

const multerDiskStorage = multer.diskStorage({ destination: 'uploads/',
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({storage:multerDiskStorage})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    store: MongoStore.create({
        mongoUrl : process.env.MONGODB,
        autoRemove:"disabled"
    }),
    secret: process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized:true
}))


app.set("views",path.join(__dirname, "views"))
app.set("view engine","ejs")


app.get("/",(req,res)=>{
    res.render("index", {})
})

app.post("/upload", upload.array("documents"), (req,res)=>{
    console.log(req.files)
    res.json({"Files": req.files})
})

app.listen(PORT, ()=>{
    console.log(__dirname)
    console.log(`http://localhost:${PORT}`)
})