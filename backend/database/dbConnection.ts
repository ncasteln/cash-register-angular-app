import mongoose from 'mongoose';

const connectToDb = async (env: string) => {
  try {
    const mongouri = process.env.MONGO;

    if (!mongouri)
      throw Error("* MONGO_URI not set")
    const mongo = await mongoose.connect(mongouri);
    console.log(`* Connected to database: [${mongo.connection.host}]`)
  }
  catch (err) {
    console.error(err)
    process.exit(1);
  }
}

export default connectToDb;
