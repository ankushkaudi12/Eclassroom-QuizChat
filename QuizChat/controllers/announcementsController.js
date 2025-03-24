const db = require("../database/connection");

const addAnnouncements = async (req, res) => {
  const { subject, description, attachment, classroom_id } = req.body;

  try {
    await db.execute(
      "INSERT INTO announcements (subject, description, attachment, classroom_id) VALUES (?, ?, ?, ?)",
      [subject, description, attachment, classroom_id]
    );
    return res.status(201).json({ message: "Announcement added successfully" });
  } catch (error) {
    console.error("Error adding announcement: ", error);
    return res.status(500).json({ error: "Error adding announcement" });
  }
};

module.exports = { addAnnouncements };
