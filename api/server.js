import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
 import userRoute from "./routes/user.route.js";
 import postRoute from "./routes/post.route.js";
import orderRoute from "./routes/order.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB!");
    } catch (error) {
      console.log(error);
    }
  };
  app.use(cors({ origin: ["https://kisan-mart-tau.vercel.app", 'https://agrosync-prototype.vercel.app'], credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
   app.use("/api/posts", postRoute);
  app.use("/api/orders", orderRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.get('/', (req, res) => {
  res.status(200).send('Server up and running')
})
  
const port = 3000; // Set the desired port number ;

app.listen(port, () => {
    connect();
    console.log(`Backend server is running on port ${port}!`);
});