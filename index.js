const express = require("express");
const { connection } = require("./config/db");
const { UserModel } = require("./models/User.model");
const { TodosRouter } = require("./route/Todos.route");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {authenticate}  = require("./middleware/authentication")
var cors = require('cors')
const app  = express();
app.use(cors({
    origin:"*"
}))
app.use(express.json())



app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.post("/signup",(req,res)=>{
    console.log(req.body)
    const {email,password}  = req.body
    try {
        bcrypt.hash(password, 4 ,async(err,hash)=>{
        const user = new UserModel({email:email,password:hash});
        await user.save();
        res.send("Sign Up Successfully")
        })
        
    } catch (error) {
        console.log("Problem in SignUp")
    }
})

app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.find({email:email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token = jwt.sign({"userID":user[0]._id}, 'yogi');
                    res.send({"msg":"Login Success","token":token})
                }
                else{
                    res.send("Invalid Detail")
                }
            })  
        }
        else{
            res.send("Invalid Username Password")
        }
    } catch (error) {
        console.log("something went wrong")
    }
})
app.use(authenticate)
app.use("/todo",TodosRouter)

app.listen(8081,async()=>{
    try {
        await connection;
        console.log("connected to db")
    } catch (error) {
        console.log("something wrong to connect with db")
    }
    console.log("listeining on port 8081")
})