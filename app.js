const express=require('express');
const app=express()
const mongo =require('mongoose')
require('dotenv').config()
mongo.connect(process.env.DB, {useNewUrlParser: true,useUnifiedTopology:true}).then(()=>{
    console.log("connection Suucessfull")
})
const WishSchema=new mongo.Schema({
    wish:{
      type:String,
      required:true,
      lowercase:true,
    }
})
let WishModel=mongo.model('Wish',WishSchema)
app.set('view engine','ejs')
const parser=require("body-parser")
middleware=[
    parser.urlencoded({extended:true})
]
app.get('/',function(req,res){
    res.render('\index')
})
const item=[];
var i=0;
app.post('/home',middleware,function(req,res){
    item[i++]=req.body.num1
    const wish=new WishModel({
        wish:req.body.num1
    })
    wish.save().then(()=>{
        console.log("saved successfull")
    }).catch(e=>{
        console.log(error)
    })
    res.render('\home',{
       item
    })
})
app.get('/home/:id',function(req,res){
    item.splice(req.params.id,1)
    res.render('\home',{
        item
     })
})
app.listen(process.env.PORT)