const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongodb connection string
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Database Connected: ${conn.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB