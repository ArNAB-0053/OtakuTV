import mongoose from "mongoose";

const connectMongodb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000 // Increase the timeout to 30 seconds
          })
        console.log("Connected to MongoDB")
    } catch(err) {
        console.log(err)
    }
}

export default connectMongodb