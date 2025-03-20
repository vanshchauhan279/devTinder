const mongoose = require("mongoose")
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
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    skills:{
        type: [String]
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