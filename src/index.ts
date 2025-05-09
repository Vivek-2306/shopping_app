import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import {v4 as uuidv4} from 'uuid';
import {rateLimit} from 'express-rate-limit';
import DBConfig from './config/db';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;
const SESSION_SECRET = process.env.SESSION || uuidv4(); // Generate a new UUID if SESSION is not set

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet()); // Adds security headers to the response
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.listen(PORT, async() => {
    await DBConfig.getConnection() // Connect to MongoDB
    console.log(`Server is running on port ${PORT}`);
});