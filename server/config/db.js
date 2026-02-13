import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("✅ MongoDB Connected")
    );

    await mongoose.connect(process.env.MONGO_URI);

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

export default connectDB;
