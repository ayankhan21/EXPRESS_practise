const express = require("express");
const app = express();
const mongoose = require("mongoose"); // third party for managing mongoDB
const bodyParser = require('body-parser');
const practise = require('./model/schema');


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))


//connect to mongoDB
const dbURI =
"mongodb+srv://ayankhan21:Dellinspiron7588@cluster0.sfa1ovo.mongodb.net/EXPRESS?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) // for connection of DB; second arg not compulsory(only to avoid a warning)
  .then((result) => {
    console.log('listening on 3000')
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

//ROUTES

app.get('/users',async (req,res,next)=>{
    let result = []
    try {
        result = await practise.find()
    } catch (error) {
        console.log(error)
    }
    res.json(result)
})

app.post('/addUser',(req,res)=>{
    // const {name ,email,password,description} = req.body;
    if(!req.body){
        return res.send({message:'CHECK AGAIN'})
    }
    console.log(req.body)
    const new_user = new practise(req.body)
    try {
        new_user.save()
    } catch (error) {
        console.log("new user wasnt added")
    }
    res.status(200).json({"message":'New user has been added'})
})

app.put('/update',async(req,res)=>{
    const {name,email,password,description} = req.body
    let doc = await practise.findOneAndUpdate({'name':name},{
        name,email,password,description
    });
    doc.save();
})

app.delete('/user',async(req,res)=>{
    const {name,email,password,description} = req.body
    let doc = await practise.findOneAndDelete({'name':name},(err,docs)=>{
        if(err){
            console.log(err)
        }else{
            console.log(docs)
        }
    })
    doc.save();
})