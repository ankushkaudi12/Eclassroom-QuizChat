const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const http = require('http');
const db = require('./database/connection.js');
const router = require('./routes/router.js');
const dotenv = require('dotenv');
const path = require('path');
const handleSocket = require('./socket.js'); // Import WebSocket handler

const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    optionsSuccessStatus: 200,
    methods: 'GET, PUT, POST, DELETE'
};

const app = express();
const server = http.createServer(app);

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

dotenv.config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 3000;

db.getConnection().then(() => {
    console.log('✅ Database connected');

    // Start HTTP server
    server.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
    });

    // ✅ Initialize WebSocket server only once
    handleSocket(server);
}).catch((err) => {
    console.error('❌ Database connection failed: ', err);
    process.exit(1);
});

// API routes
app.use('/api', router);

app.get('/', (req, res) => {
    res.status(200).send('Connected');
});
