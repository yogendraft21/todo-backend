const jwt = require("jsonwebtoken")

const authenticate=(req,res,next)=>{
        const token = req.headers?.authorization?.split(" ")[1]

        if(token){
            const decode = jwt.verify(token,'yogi')
            if(decode){
                // console.log(decode)
                const userID = decode.userID;
                req.body.userID = userID;
                next();
            }
            else{
                res.send("Invalid Credetials")
            }
        }
        
}

module.exports={
    authenticate    
}