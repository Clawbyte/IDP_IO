import express, { Request, Response } from 'express'
import { MongoClient } from 'mongodb'
import mongoose, { Schema } from 'mongoose'
import Test from './models/test.schema'

const app = express()
const port = 3000
const mongodb = process.env.MONGO_URL || 'mongodb://mongo:27017/idp2025'

app.listen(port, async () => {
    console.log(`Microservice running at http://localhost:${port}`)
    try {
        await mongoose.connect(mongodb)
        .then(() => console.log('Connected to MongoDB'))
    } catch (err) {
        console.log('MongoDB connection error:', err)
    }
})

// Endpoint example
app.get('/', async (req: Request, res: Response) => {
    let newTest = new Test({ eggs: 6, drink: "Coffee"})
    await newTest.save();

    const test = await Test.find()

    res.json(test)
})