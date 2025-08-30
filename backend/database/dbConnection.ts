import mongoose from 'mongoose';

const connectToDb = async () => {
  const m = "mongodb://mongodb:27017/selvetto_db"

  try {
    if (!m)
      throw new Error("MONGODB_DEV is not defined")
    else {
      console.log("ENV: ", process.env.MONGO_URI);

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
