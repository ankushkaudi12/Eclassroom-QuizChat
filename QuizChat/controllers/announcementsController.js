const db = require("../database/connection");

const addAnnouncements = async (req, res) => {
  const { subject, description, classroom_id } = req.body;

  try {
    await db.execute(
      "INSERT INTO announcements (subject, description, classroom_id) VALUES (?, ?, ?)",
      [subject, description, classroom_id]
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

const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { subject, description, classroom_id } = req.body;

  try {
    await db.execute(
      "UPDATE announcements SET subject = ?, description = ?, classroom_id = ? WHERE id = ?",
      [subject, description, classroom_id, id]
    );

    console.log(`📢 Announcement with ID ${id} updated successfully`);
    return res
      .status(200)
      .json({ message: "Announcement updated successfully" });
  } catch (error) {
    console.error("❌ Error updating announcement: ", error);
    return res.status(500).json({ error: "Error updating announcement" });
  }
};

const deleteAnnouncement = async (req, res) => {
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
  addAnnouncements,
  getAnnouncements,
  deleteAnnouncement,
  updateAnnouncement,
};
