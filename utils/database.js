import mongoose, { mongo } from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB already connected.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.log(error);
    }
}