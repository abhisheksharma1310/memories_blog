
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

//connect to mongodb databse server
const user = process.env.USR;
const dbp = process.env.DBP;
const database = process.env.DB;
const localUrl = "mongodb://localhost:27017/" + database;
const DB_CONNECTION_URL =
  "mongodb+srv://" + user + ":" +
  dbp +
  "@cluster0.nvcjjqq.mongodb.net/" +
  database;
const PORT = process.env.PORT|| 5000;

mongoose.connect(DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);