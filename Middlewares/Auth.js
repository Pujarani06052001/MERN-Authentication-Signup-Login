const jwt=require('jsonwebtoken');

const ensureAuthenticated=(req,res,next)=>{
    const auth=req.headers['authorization'];

    if(!auth){
        return res.status(403)
        .json({message:'Unaouthorized ,JWT token is requre'})
    }
    try{
        const decoded=jwt.verify(auth,process.env.JWT_SRCRET);
        req.user=decoded;
        next()
    }catch(err){
        return res.status(403)
        .json({message:'Unaouthorized ,JWT token wrong or expired'})

    }
}
module.exports=ensureAuthenticated;