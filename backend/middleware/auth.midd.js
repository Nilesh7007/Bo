const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{

    const token = req.headers.authorization

    if(token){
        try {
            const decoded = jwt.verify(token, 'masai')
            if(decoded){
                req.body.userID = decoded.userID
                req.body.user = decoded.user
                next()
            }
            else{
                res.status(200).json({"msg":"please login"})
            }
        } catch (error) {
            res.send({"err":error.message})
        }
    }
    else{
        res.status(200).send({"msg":"please login"})
    }
}
module.exports = {auth}