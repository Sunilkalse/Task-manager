const express =require("express")
const Task=require("../models/Task")
let taskRouter=express.Router()

taskRouter.get("/",async(req,res)=>{
   
  try{ 
    let tasks=await Task.find().lean()
     res.render("home",{tasks:tasks})
}catch(err){
    console.log(err);
}
    })
taskRouter.post("/",async(req,res)=>{
let {task}=req.body
try {
    let duplicate= await Task.findOne({task:task})
    if(duplicate){
        return res.redirect("/task")
    }else{
        await Task.create({
            task:task
        })
        res.redirect("/task")
    }

} catch (error) {
    res.status(401).json({
        message:"can't create task"
    })    
}
})

taskRouter.get("/:id",async (req,res)=>{
    let id=req.params.id
    try{
        let task=await Task.findOne({_id:id}).lean()
        console.log(task);
        res.render("update",{task})

    }catch(error){
        console.log(error);
    }
})
//update functionality
taskRouter.put("/:id",async (req,res)=>{
    let id=req.params.id
    let {task}=req.body
    try{
        await Task.updateOne({_id:id},{$set:{task:task}})
res.redirect("/task")        

    }catch(error){
        console.log(error);
        res.redirect("/:id")
    }
})
// delete functionality
taskRouter.delete("/:id",async (req,res)=>{
    let id=req.params.id
    try{
        await Task.deleteOne({_id:id})
        res.redirect("/task")        

        }catch(error){
        console.log(error);
        res.redirect("/task")
    }
})

module.exports=taskRouter;