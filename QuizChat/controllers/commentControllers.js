const db = require("../database/connection");

const saveComment = async (req, res) => {
  const { classroom_id, sender, comment } = req.body;
  try {
    await db.execute(
      "INSERT INTO classroom_comments (classroom_id, sender, comment) VALUES (?, ?, ?)",
      [classroom_id, sender, comment]
    );
    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ message: "Failed to save comment" });
  }
};

const getComments = async (req, res) => {
  const classroomId = String(req.params.classroom_id); // Ensure it's a string

  if (!classroomId) {
    return res.status(400).json({ error: "classroom_id is required" });
  }

  try {
    console.log("Fetching comments for classroom_id:", classroomId);
    const [comments] = await db.query(
      "SELECT * FROM classroom_comments WHERE classroom_id = ?",
      [classroomId]
    );
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

module.exports = { saveComment, getComments };
