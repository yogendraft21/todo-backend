const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://yogendra:yogendra@cluster0.r2gbftx.mongodb.net/todo?retryWrites=true&w=majority")


module.exports={
    connection
}