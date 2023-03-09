const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

const connectDB = async (STRING, OPTION) => {
    try {
       await mongoose.connect(STRING, OPTION)
       console.log(`Database connection established ${mongoose.connection.host}`.bgYellow)
    } catch (err) {
       console.log(err) 
    }
}


module.exports = connectDB