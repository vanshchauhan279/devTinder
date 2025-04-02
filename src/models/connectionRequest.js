const mongoose = require("mongoose");
const {Schema}= mongoose;

const connectionRequestSchema = new Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["ignored","interested","accepted","rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }
},
{timestamps: true})

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1});

connectionRequestSchema.pre('save', function(next){
    if(this.toUserId.toString()===this.fromUserId.toString()){
        throw new Error("Can not send request to yourself")
    }
    next();
})

const connectionRequest = mongoose.model('connectionRequest', connectionRequestSchema)

module.exports = connectionRequest;