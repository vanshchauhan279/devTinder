const mongoose = require('mongoose')

const connectDb = async ()=>{
    await mongoose.connect('mongodb+srv://Namaste:V6QWxdhL4AAG7Mt1@namastenode.cl9pw.mongodb.net/devTinder');

}

module.exports = connectDb