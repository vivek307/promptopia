import mongoose from "mongoose";

let isConnected = false;

export const connectionToDB = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('>>>>>');
    isConnected = true

    console.log('MongoDB connectd')
  } catch (error) {
    console.log(error);
  }
}