import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async()=>{
    try {
          const connectionInstance =  await mongoose.connect
             (`${process.env.MONGODB_URI}/${DB_NAME}`);
             //This is knowing for on which server is you connected there are different db for testing . deployment and more
             console.log(`\n MongoDB connected !! DB HOSt : ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MOGODB connection error : ",error);
        process.exit(1);
        
        
    }
}

export default connectDB;