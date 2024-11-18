import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB Connected: ${connect.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`error in mongoDB connection${error}`.bgRed.white);
  }
};

export default connectDB;
