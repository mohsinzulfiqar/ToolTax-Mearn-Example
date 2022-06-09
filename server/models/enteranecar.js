const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    numberplate:{
        type: String,
        required:true
    },
    indate:{
        type: Date,
        required:true
    },
    interchange:{
        type: String,
        required:true
    },
    ridestatus:{
        type:Boolean,
        required:true
    }

})

const enteranecar= new mongoose.model("enteranecar",userSchema);

module.exports = enteranecar;