import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import RegisterRouter from "./src/routes/RegistrationRouter.js"
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const __dirname = path.resolve();
app.use(express.static(__dirname))

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server Running port ${PORT}`);
});

app.use("/registration", RegisterRouter);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database successfully connected!");
  })
  .catch((err) => {
    console.error("Error connecting to the database: ", err);
  });

