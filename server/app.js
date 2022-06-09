require("dotenv").config();

const express= require("express");

const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const enteranecar= require("./models/enteranecar");

const router = require("./routes/router");
const cors=require("cors");
const port = 8003 ;

app.use(cors());
app.use(express.json());

app.use(router);


app.listen(port,()=>{
    console.log(`server is starting at port ${port}`)
})