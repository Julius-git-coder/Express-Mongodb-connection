import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGODBURL = process.env.MONGODB_URI;

mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log("database is connected successfully ");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const UserModel = mongoose.model("users", userSchema);
app.get("/", (req, res) => {
  res.send("✅ Server is working!");
});

app.get("/getUsers", async (req, res) => {
  const userData = await UserModel.find();
  res.json(userData)
});
