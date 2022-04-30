const express = require('express');
const app = express();
const mongoose = require("mongoose");
const BrandName = require("./model");

app.use(express.json());

mongoose.connect('mongodb+srv://Vignan83:Vignan83@cluster0.zpht7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=>{
    console.log("DB connected");
}).catch(err=>console.log(err));
app.get('/',(req,res)=>{
    res.send("Hello Vignan");
})

app.post('/addbrands',async (req,res)=>{
    const {brandname} = req.body;
    try{
       const newData = new BrandName({brandname});
       await newData.save();
       return res.json(await BrandName.find())
    }
    catch(err){
        console.log(err);
    }
})


app.get('/getallbrands',async (req,res)=>{
    try{
        const allData = await BrandName.find();
        return res.json(allData);
    }
    catch(err){
        console.log(err.message);
    }
})


app.get('/getallbrands/:id',async (req,res)=>{
    try{
        const idItem = await BrandName.findById(req.params.id);
        return res.json(idItem);
    }
    catch(err){
        console.log(err.message);
    }
})





app.listen(3000,()=>{
    console.log("server running");
})