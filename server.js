
const express=require("express")
const mongoose=require("mongoose");
const taskRouter = require("./routes/taskRouter");
const methodOverride=require("method-override")

let app=express()
//db connection
async function db(){
    await mongoose.connect("mongodb://127.0.0.1:27017/taskDB");
    console.log("db is connected");
} 
db();
//register template
app.set("view engine","ejs")
//inbuilt middleware
//static files
app.use(express.static("public"))

// to get form data
    app.use(express.urlencoded({extended:false}))
// method override middleware 
 app.use(methodOverride('_method'))

app.use("/task",taskRouter)
//http://localhost:5000/task/
//http://localhost:5000/task/update

app.listen(5000,()=>{
    console.log("this server is running on port 5000");
})