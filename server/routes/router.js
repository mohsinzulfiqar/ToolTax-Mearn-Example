const express = require("express");
const router = express.Router();
const users = require("../models/enteranecar");



router.post("/register", async(req, res)=>{
    const { numberplate,indate, interchange,ridestatus} = req.body;
    if(!numberplate || !indate || !interchange ){
        req.status(404).json("please fill all the data")
    }

    try{
        const addrecord= new users({
            numberplate,indate, interchange,ridestatus
        });
        await addrecord.save();
        res.status(201).json(addrecord);
    }
    catch(error){
        res.status(404).send(error)
    }
}
)

//search data
router.post("/search/", async(req, res)=>{
    try{
        const {noplate,status} = req.body
        const _car = await users.findOne({numberplate:noplate,ridestatus:status});
        res.status(201).json(_car)
    }
    catch(error){
        res.status(404).send(error)
    }
}
)

//get user data

router.get("/getdata", async(req,res)=>{
    try{
        const getData=await users.find();
        res.status(201).json(getData);
    }
    catch(error){
        console.log("errrrorrr",error)
    }
})



module.exports = (router);