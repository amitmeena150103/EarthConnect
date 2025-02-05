const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://booking:Aniket%402002@cluster0.rrneucc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
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
