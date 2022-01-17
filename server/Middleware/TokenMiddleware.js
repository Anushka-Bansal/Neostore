const jwt = require('jsonwebtoken');
const jwtSecret="asdfrtuyxsde4677dff788"

function autenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    console.log(token);
    if(token==null){
        res.json({"msg":"Token not matched"})
    }
    else{
        jwt.verify(token,jwtSecret,(err,data)=>{
            if(err){
                res.json({"msg":"Token is invalid"})
            }
            else{
                next();
            }
        })
    }
}

module.exports ={autenticateToken}
