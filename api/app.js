import express from 'express';
// import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import multer from 'multer';
//  import { validationResult } from "express-validator";
import config from './config.js'
import cors from 'cors'
import checkAuth from './utils/checkAuth.js'
import { registerValidator, postValidator } from './validations.js'
// import user from './models/User.js';
import * as PostController from './controllers/PostController.js'
import * as UserController from './controllers/userController.js'

import checkValError from './utils/handleValidationErorr.js'
mongoose
    .connect(config.urlDataBase)
    .then(() => console.log("DB OK"))
    .catch(() => "DB erorr")
const app = express()
const corsOptions = {
    exposedHeaders: 'total_count',
    credentials: true
};
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})
console.log(config)
const upload = multer({ storage })


app.use(cors(corsOptions));

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.get('/', (req, res) => {
    res.send("Hello World")
});
app.get('/auth/me', checkAuth, UserController.auth)
app.post("/auth/login", UserController.login)
app.post("/auth/register", registerValidator, checkValError, UserController.register)
// Post
app.post("/posts", postValidator, checkValError, PostController.create)
app.get("/posts/:url", PostController.getOne)
app.get("/posts/id/:id", checkAuth, PostController.getOneId)
app.delete("/posts/:id", checkAuth, PostController.remove)
app.get("/posts", PostController.getAll)

// UPLOAD IMAGE TO SERVER 
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    try {
        res.json({
            url: `/uploads/${req.file.originalname}`,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось загрузить на сервер картинку'
        })
    }
})

app.listen(config.port, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server ok')
})