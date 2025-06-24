import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title: String,
  name: String,
  last_name: String,
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.model("User", userSchema);
