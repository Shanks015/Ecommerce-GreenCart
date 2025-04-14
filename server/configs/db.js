import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongo connection successfull"))
    .catch((err) => console.log('Err in mongo conn: ', err))
}


export default connectDB;