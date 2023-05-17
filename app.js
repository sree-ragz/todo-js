const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const mongoose=require('mongoose')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))


mongoose.connect("mongodb://127.0.0.1:27017/todolistDB").then(()=>{
    console.log("successfully connected db");
}).catch((err)=>{
    console.log(err);
})
const itemSchema={
    name:String,
}
const item=mongoose.model("item",itemSchema)

const item1=new item({
    name:"welcome"
})
const item2=new item({
    name:"hit the button "
})
const item3=new item({
    name:"delete button"
})
const defaultItems=[item1,item2,item3]

app.get('/',function(req,res){
    item.find({}).then((docs)=>{
        if(docs.length===0){
            item.insertMany(defaultItems).then((obj)=>{
                console.log("successfully added items");
            }).catch((err)=>{
                console.log(err);
            })
            res.redirect("/")
        }else{
            res.render('lists',{listTitle:"Today" ,newItems:docs})
        }
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/",function(req,res){
    const itemName=req.body.newValue
    const nextItem=item({
        name:itemName
    })
    item.insertMany(nextItem).then(()=>{
        console.log("added new item");
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/")
})

app.post("/delete",(req,res)=>{
    const checkedItem=req.body.checkbox
    item.findByIdAndRemove(checkedItem).then(()=>{
        console.log("dleted");
    })
    res.redirect("/")
})

app.get("/work",function(req,res){
    res.render('lists',{listTitle:"myworks",newItems:lists})
})

app.listen(3000,function(){
    console.log("server running");
})
