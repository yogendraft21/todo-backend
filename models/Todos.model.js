const mongoose = require("mongoose")

const TodosSchema = mongoose.Schema({
   taskname:String,
   status:String,
   tag:String,
   userID:String
})


const TodosModel = mongoose.model("todos",TodosSchema)

module.exports={
    TodosModel
}