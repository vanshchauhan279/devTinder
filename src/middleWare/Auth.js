const adminAuth=(req,res,next)=>{
    console.log("this also triggers")
    const token = "xyz"
    const isAdminAuthorized = token==="xyz"

    if(!isAdminAuthorized){
        res.status(401).send("unAuthorized Data");
    }
    else{
        next();
    }   
};

const userAuth = (req,res,next)=>{
    console.log("user authentication")
    const token = "xyz"
    const isAdminAuthorized = token==="xyz"

    if(!isAdminAuthorized){
        res.status(401).send("Not Authorized Person");
    }
    else{
        next();
    }   
}

module.exports={
    adminAuth,
    userAuth
};