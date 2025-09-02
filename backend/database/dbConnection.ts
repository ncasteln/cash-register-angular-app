import mongoose from 'mongoose';

const connectToDb = async () => {
  try {
    const m = process.env.NODE_ENV === "production"
      ? process.env.MONGO_PROD
      : process.env.MONGO_DEV;
    if (!m)
      throw Error("* Not able to find MONGODB ip address")
    const mongo = await mongoose.connect(m);
    console.log(`* Connected to database: ${mongo.connection.host} [${process.env.NODE_ENV} mode]`)
  }
  catch (err) {
    console.error(err)
    process.exit(1);
  }
}

export default connectToDb;
