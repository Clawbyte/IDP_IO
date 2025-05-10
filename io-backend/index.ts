import express, { Request, Response } from 'express'
import { MongoClient } from 'mongodb'
import mongoose, { Schema } from 'mongoose'
import User from './models/user.schema'
import Book from './models/book.schema'
import bcrypt from 'bcryptjs'

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
