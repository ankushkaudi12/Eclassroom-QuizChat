const db = require("../database/connection");

// saves comment to database
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

// retrieves comments from database based on classroom_id
const getComments = async (classroomId) => {
  if (!classroomId) {
    throw new Error("classroom_id is required");
  }

  try {
    console.log("Fetching comments for classroom_id:", classroomId);
    const [comments] = await db.query(
      "SELECT * FROM classroom_comments WHERE classroom_id = ?",
      [classroomId]
    );
    return comments;
  } catch (err) {
    console.error("Error fetching comments:", err);
    throw new Error("Failed to fetch comments");
  }
};

module.exports = { saveComment, getComments };
