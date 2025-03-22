const validator = require("validator")

const Validation = (req)=>{
        const {firstName,lastName,password,email}=req.body;

        if(!firstName || !lastName){
              throw new Error("First and Last name should be mandatory")
        }
        else if(firstName.length < 4 || firstName.length>20){
               throw new Error("Name should be atleast 4 length")
         }
        else if(!validator.isEmail(email)){
             throw new Error("Email is not valid")     
        }
        else if(!validator.isStrongPassword(password)){
            throw new Error("Password is not strong")  
        }
}
module.exports = Validation
