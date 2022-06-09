const mongoose = require("mongoose");

const DB='mongodb+srv://mosn:mohaye11@cluster0.ayzc0.mongodb.net/tooltex?retryWrites=true&w=majority'

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("connection start")).catch((error)=>console.log(error.message));