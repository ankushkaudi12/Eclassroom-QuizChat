const db = require("../database/connection");
const multer = require("multer");
const path = require("path");

// Set up multer storage for file uploads
const UPLOADS_DIR = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File upload middleware
const upload = multer({ storage });

const addAnnouncements = async (req, res) => {
  const { subject, description, classroom_id } = req.body;
  const attachment = req.file ? req.file.filename : null; // If no file, set to NULL

  try {
    await db.execute(
      "INSERT INTO announcements (subject, description, attachment, classroom_id) VALUES (?, ?, ?, ?)",
      [subject, description, attachment, classroom_id]
    );
    console.log("Announcement added successfully");
    return res.status(201).json({ message: "Announcement added successfully" });
  } catch (error) {
    console.error("Error adding announcement: ", error);
    return res.status(500).json({ error: "Error adding announcement" });
  }
};

const getAnnouncements = async (req, res) => {
  const { classroom_id } = req.params;

  try {
    const [announcements] = await db.execute(
      "SELECT * FROM announcements WHERE classroom_id = ?",
      [classroom_id]
    );
    console.log("Announcements fetched successfully");
    return res.status(201).json(announcements);
  } catch (error) {
    console.error("Error fetching announcements: ", error);
    return res.status(500).json({ error: "Error fetching announcement" });
  }
};

module.exports = { addAnnouncements, upload, getAnnouncements };
