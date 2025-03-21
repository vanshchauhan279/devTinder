const mongoose = require("mongoose")
const validator = require("validator")
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

const User = mongoose.model('User',userSchema);

module.exports = User