const jwt=require('jsonwebtoken');
const {secret}=require('../config/jwt.config');
module.exports=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
     debugger;
    if(!token){
        return res.status(401).json({message:'Access token missing'});
    }
    jwt.verify(token,secret,(err,user)=>{
        if(err){
            return res.status(403).json({message:'Invalid access token'});
        }  
        req.user=user;
        next();
    });
    
};