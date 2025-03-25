const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(`${value} is not valid email`)
            }
        }
       
    },
    password:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error(`${value} is not a strong password`)
            }
        }
    },
    skills:{
        type: [String],
        validate(arr) {
             
                return arr.length >=0 && arr.length<=4;
             
        }
    },
    gender:{
        type: String,
        validate(value){
            if(!["Male","Female","Others"].includes(value)){
                throw new Error(`${value} is not valid gender`)
            }
        }
    }
}, { timestamps: true })

userSchema.methods.getJWT = async function(){
     const user = this; 
     const token =await jwt.sign({  _id: user._id }, 'VanshChauhan975922',{ expiresIn: '1d'});

     return token;
}

userSchema.methods.validatedPassword = async function(password){
    const user = this;
    const validPassword =await bcrypt.compare(password, user.password);
   
    return validPassword;
}

const User = mongoose.model('User',userSchema);

module.exports = User