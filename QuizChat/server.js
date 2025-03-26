const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const db = require("./database/connection.js");
const router = require("./routes/router.js");
const dotenv = require("dotenv");
const handleSocket = require("./socket.js");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  optionsSuccessStatus: 200,
  methods: "GET, PUT, POST, DELETE",
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Ensure the "uploads" folder exists
const UPLOADS_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve uploaded files statically
app.use("/uploads", express.static(UPLOADS_DIR));

db.getConnection()
  .then(() => {
    console.log("✅ Database connected");

    server.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });

    handleSocket(server);
  })
  .catch((err) => {
    console.error("❌ Database connection failed: ", err);
    process.exit(1);
  });

// API routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).send("Connected");
});
