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

const addNotes = async (req, res) => {
  const { subject, description, classroom_id } = req.body;
  const attachment = req.file ? req.file.filename : null; // If no file, set to NULL

  try {
    await db.execute(
      "INSERT INTO notes (subject, description, attachment, classroom_id) VALUES (?, ?, ?, ?)",
      [subject, description, attachment, classroom_id]
    );
    console.log("Notes added successfully");
    return res.status(201).json({ message: "Notes added successfully" });
  } catch (error) {
    console.error("Error adding notes: ", error);
    return res.status(500).json({ error: "Error adding notes" });
  }
};

const getNotes = async (req, res) => {
  const { classroom_id } = req.params;

  try {
    const [notes] = await db.execute(
      "SELECT * FROM notes WHERE classroom_id = ?",
      [classroom_id]
    );
    console.log("Notes fetched successfully");
    return res.status(201).json(notes);
  } catch (error) {
    console.error("Error fetching notes: ", error);
    return res.status(500).json({ error: "Error fetching notes" });
  }
};

const updateNotes = async (req, res) => {
  const { id } = req.params;
  const { subject, description, classroom_id } = req.body;
  const attachment = req.file ? req.file.filename : null;

  try {
    if (attachment) {
      // If a new file is uploaded, update the attachment too
      await db.execute(
        "UPDATE notes SET subject = ?, description = ?, attachment = ?, classroom_id = ? WHERE id = ?",
        [subject, description, attachment, classroom_id, id]
      );
    } else {
      // No new file uploaded, preserve the existing attachment
      await db.execute(
        "UPDATE notes SET subject = ?, description = ?, classroom_id = ? WHERE id = ?",
        [subject, description, classroom_id, id]
      );
    }

    console.log(`📢 Notes with ID ${id} updated successfully`);
    return res
      .status(200)
      .json({ message: "Notes updated successfully" });
  } catch (error) {
    console.error("❌ Error updating notes: ", error);
    return res.status(500).json({ error: "Error updating notes" });
  }
};

const deleteNotes = async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute("DELETE FROM announcements WHERE id = ?", [id]);
    console.log(`Announcement with ID ${id} deleted successfully`);
    return res
      .status(200)
      .json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement: ", error);
    return res.status(500).json({ error: "Error deleting announcement" });
  }
};

module.exports = {
  addNotes,
  upload,
  getNotes,
  deleteNotes,
  updateNotes,
};
