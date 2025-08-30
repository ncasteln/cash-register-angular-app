import mongoose from 'mongoose';

const connectToDb = async () => {
  const m = process.env.MONGO_URI

  try {
    if (!m)
      throw new Error("MONGO_URI is not defined")
    else {
      const mongo = await mongoose.connect(m);
      console.log(`* Connected to database: ${mongo.connection.host}`)
    }
  }
  catch (err) {
    console.error(err)
    process.exit(1);
  }
}

export default connectToDb;
