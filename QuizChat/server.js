import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import db from './database/connection.js';
import router from './routes/router.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

var corsOptions = {
    origin: ['http://localhost:5173','http://127.0.0.1:5173'],
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE"
}

const app = express();

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path: path.join(__dirname, '.env')});

const PORT = process.env.PORT || 3000;

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Database connection established');

        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`); 
        });
    }
});

app.get('/', (req, res) => {
    res.status(200).send("connected");
})

app.use('/api', router);