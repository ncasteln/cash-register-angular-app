import mongoose from 'mongoose';

const connectToDb = async () => {
  const m = "mongodb://mongodb:27017/selvetto_db"

  try {
    if (!m/* process.env.MONGODB_DEV */)
      throw new Error("MONGODB_DEV is not defined")
    else {
      console.log("NODE ENV: ", process.env.NODE_ENV);

      const mongo = await mongoose.connect(
        m/* process.env.MONGODB_DEV */,
        // {
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true,
        // }
      );
      console.log(`* Connected to database: ${mongo.connection.host}`)
    }
  }
  catch (err) {
    console.error(err)
    process.exit(1);
  }
}

export default connectToDb;
