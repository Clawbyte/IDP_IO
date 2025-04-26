import mongoose, { Schema } from "mongoose";

// Schema example
const testSchema = new Schema({
    eggs: {
      type: Number,
      min: [6, "Too few eggs"],
      max: 12,
      required: [true, "Why no eggs?"],
    },
    drink: {
      type: String,
      enum: ["Coffee", "Tea", "Water"],
    },
});

const Test = mongoose.model("Test", testSchema);

export default Test