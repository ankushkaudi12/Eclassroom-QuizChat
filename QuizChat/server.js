const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const http = require('http');
const db = require('./database/connection.js');
const router = require('./routes/router.js');
const dotenv = require('dotenv');
const path = require('path');
const handleSocket = require('./socket.js');
const { Socket } = require('dgram');

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

db.getConnection().then(() => {
    console.log('Database connected');

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

    handleSocket(server);
}).catch((err) => {
    console.error('Database connection failed: ', err);
    process.exit(1);
})

app.get('/', (req, res) => {
    res.status(200).send('Connected');
});

handleSocket(server); // Pass the server instance

app.use('/api', router);
