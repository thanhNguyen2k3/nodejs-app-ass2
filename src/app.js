import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './router/index.js';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api', router);

mongoose.connect(process.env.API_MONGODB);

app.get('/', function (req, res) {
    res.json('Hello');
});

app.listen(port, () => {
    console.log(`server is running: http://localhost:${port}`);
});
