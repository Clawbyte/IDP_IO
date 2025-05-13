import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        min: [2, "Too few characters for book title"],
        required: [true, "Book title required"]
    },
    author: {
        type: String,
        min: [3, "Too few characters for author's name"],
        required: [true, "Author required"]
    },
    read: {
        type: Boolean,
        default: false
    },
    user: {
        type: String,
        required: [true, "Username required"]
    },
});

const Book = mongoose.model("Book", bookSchema);

export default Book