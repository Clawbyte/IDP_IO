import express, { Request, Response } from 'express'
import { MongoClient } from 'mongodb'
import mongoose, { Schema } from 'mongoose'
import User from './models/user.schema'
import Book from './models/book.schema'
import bcrypt from 'bcryptjs'
import { authMiddleware } from './middlewares/authenticate.middleware'

const app = express()
const port = 3000
const mongodb = process.env.MONGO_URL || 'mongodb://localhost:27017/idp2025'

app.use(express.json());

app.listen(port, async () => {
    console.log(`Microservice running at http://localhost:${port}`)
    try {
        await mongoose.connect(mongodb)
        .then(() => console.log('Connected to MongoDB'))
    } catch (err) {
        console.log('MongoDB connection error:', err)
    }
})



// Add user route
app.post('/user', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: "Error" });
    }
})

// Check if user exists route
app.get('/user/:username', async (req: Request<{ username: string }>, res: Response) => {
    const { username } = req.params;
    const existingUser = await User.findOne({ username });
    res.json({ exists: existingUser != null });    
})

// Check if user-password match route
app.post('/user/valid', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user == null)
        {
            res.status(400).json({ valid: false });
            return;
        }
        const valid = await bcrypt.compare(password, user.password);
        res.json({ valid });
    } catch (err) {
        res.status(400).json({message: "Error"});
    }
})

// Add a book route
app.post('/book/add', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { title, author } = req.body;
        const book = new Book({ title, author, user: req.user });
        await book.save();
        res.json(book);
    } catch (err) {
        res.status(400).json({ message: "Error" });
    }
})

// Get all unread books route
app.get('/book/unread', authMiddleware, async (req: Request, res: Response) => {
    const username = req.user;
    try {
        const books = await Book.find({ user: username, read: false });
        res.json(books);
      } catch (err) {
        res.status(400).json({ message: "Error finding unread books" });
      }
})

// Mark a book as read/unread route
app.post('/book/read', authMiddleware, async (req: Request, res: Response) => {
    const username = req.user;
    try {
        const { id, read } = req.body;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (book.user != username) {
            return res.status(403).json({ message: "User not authorized" });
        }
        book.read = read;
        await book.save();
        res.json(book);
    } catch (err) {
        res.status(400).json({ message: "Error" });
    }
})

// Delete a book route
app.delete('/book/:id', authMiddleware, async (req: Request<{ id: string }>, res: Response) => {
    const username = req.user;
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book deleted" });
    } catch (err) {
        res.status(400).json({ message: "Error" });
    }
})
