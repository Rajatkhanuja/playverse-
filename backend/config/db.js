import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/playverse', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("DB Connected");
    } catch (error) {
      console.error("DB Connection Failed:", error.message);
      
      process.exit(1);
    }
  };
