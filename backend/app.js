import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { errorHandler } from './src/middlewares/error.middleware.js'
import cookieParser from 'cookie-parser'

dotenv.config({
    path: "./.env"
})

const app = express()

// cors configuration 
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-type', "Authorization"]
}))

// configuration 
app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser());

// routes configuration
import healthCheckRouter from './src/routes/heathcheck.route.js'
import userRouter from './src/routes/users.route.js'
import doucumentRouter from './src/routes/document.route.js'

app.use('/api/v1/health-check', healthCheckRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/documents', doucumentRouter);

app.get("/", (req, res)=>{
    res.send("Hello Suman Bro");
})

app.get("/facebook", (req, res)=>{
    res.send("Hello suman bro welcome to facebook");
})

app.use(errorHandler);

export default app;