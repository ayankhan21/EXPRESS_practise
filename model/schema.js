const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    description:{
        type:String
    }
})

const practise = new mongoose.model("practise",schema);
module.exports = practise;