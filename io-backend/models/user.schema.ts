import mongoose, { Schema } from "mongoose";

// Schema example
const userSchema = new Schema({
    username: {
      type: String,
      min: [6, "Too few characters for username"],
      max: 30,
      required: [true, "Username required"],
      unique: [true, "Username taken"]
    },
    password: {
      type: String,
      min: [8, "Too few characters for username"],
      required: [true, "Password required"],
    },
});

const User = mongoose.model("User", userSchema);

export default User