const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://bloguser:bloguser@cluster0.pzyg7m3.mongodb.net/Blogdata');
        console.log("Connected Successfully");
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
    
}

connectDB().then(()=>{
    console.log("DataBase Connected");
})



module.exports = {connectDB};
