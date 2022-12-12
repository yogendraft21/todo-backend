const express  =require("express")
const {TodosModel} = require("../models/Todos.model")
const TodosRouter  = express.Router();


TodosRouter.get("/",async(req,res)=>{
    const userID  = req.body.userID;

    try {
        const todo = await TodosModel.find({userID:userID})
        res.send(todo)
    } catch (error) {
        res.send("Something went wrong")
    }
})
TodosRouter.post("/create",async(req,res)=>{
    console.log(req.body)
    const payload = req.body;
    try {
        const todo = await TodosModel(payload)
        todo.save();
        res.send("Note Created Successfully")
    } catch (error) {
        console.log(error)
        res.send("Something Went Wrong")
    }
})
TodosRouter.patch("/edit/:todoID",async(req,res)=>{
    const {userID} = req.body;
    const payload = req.body;
    const todoID = req.params.todoID;
    const user = await TodosModel.find({_id:todoID})
    if(userID!=user[0].userID){
        res.send("Not Authorized")
    }
    else{
        try {
            await TodosModel.findByIdAndUpdate({_id:todoID},payload)
            res.send("Todo Updated Successfully")
        } catch (error) {
            console.log(error)
            res.send("Something Went Wrong")
        }
    }
   
})

TodosRouter.delete("/delete/:todoID",async(req,res)=>{
      const todoID  = req.params.todoID;
      try {
        await TodosModel.findByIdAndDelete({_id:todoID})
        res.send("Deleted Successfully")
      } catch (error) {
        console.log(error)
        res.send("Something went wrong")
      }
})


module.exports={
    TodosRouter
}