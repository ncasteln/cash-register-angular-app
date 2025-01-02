import mongoose from 'mongoose';

const connectToDb = async () => {
  try {
    if (!process.env.MONGODB_URI)
      throw new Error("MONGODB_URI is not defined")
    else {
      const mongo = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`* Connected to database: ${mongo.connection.host}`)
    }
  }
  catch (err) {
    console.error(err)
    process.exit(1);
  }
}

export default connectToDb;
