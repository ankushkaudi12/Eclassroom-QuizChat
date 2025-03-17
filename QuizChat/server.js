const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const http = require('http');
const db = require('./database/connection.js');
const router = require('./routes/router.js');
const dotenv = require('dotenv');
const path = require('path');
const handleSocket = require('./socket.js');

const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    optionsSuccessStatus: 200,
    methods: 'GET, PUT, POST, DELETE'
};

const app = express();
const server = http.createServer(app);

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // Fixed this line

dotenv.config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 3000;

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Database connection established');

        server.listen(PORT, () => { // Fixed to listen on `server`
            console.log(`Listening on port ${PORT}`);
        });
    }
});

app.get('/', (req, res) => {
    res.status(200).send('Connected');
});

handleSocket(server); // Pass the server instance

app.use('/api', router);
