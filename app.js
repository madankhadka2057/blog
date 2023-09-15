const express=require("express")
const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine","ejs")
const {data}=require('./model/index')
app.use(express.static('public'));
// get login data 
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/portfolio",async (req,res)=>{
    const namePass=await data.findAll();
    // console.log("The data is:- "+namePass)
    res.render("portfolio",{data:namePass})
})
app.get("/", async(req,res)=>{
    const allData= await data.findAll();
    // console.log("All data"+allData.data)
    res.render("table",{data:allData})
})

app.get("/update/:id",(req,res)=>{
    const id=req.params.id;
    res.render("update",{id:id})
})
app.post("/login",async(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    await data.create({
        username:username,
        password:password
})
res.redirect("/")
})
app.post("/update/:id",async (req,res)=>{
    const id=req.params.id
    const username=req.body.username
    const password=req.body.password
         
        await data.update({
            username:username,
            password:password
        },{
            where:{
                id:id
            }
        })
        res.redirect("/")
})


app.get("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    await data.destroy({
        where:{
            id:id
        }
    })
    res.redirect("/")
})

app.listen(3001,()=>{
    console.log("Port is running in 3001");
})