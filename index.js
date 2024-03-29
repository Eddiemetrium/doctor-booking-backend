import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./Routes/auth.js";
import userRouter from "./Routes/user.js";
import doctorRouter from "./Routes/doctor.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("API is working");
});

// Database connection
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
    });
    console.log("MongoDB database is connected");
  } catch (err) {
    console.log(`MongoDB database connection failed, ${err}`);
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/doctor", doctorRouter);


app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port + ${port}`);
});


