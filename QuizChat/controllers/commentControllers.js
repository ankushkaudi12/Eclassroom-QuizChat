const db = require("../database/connection");

// saves comment to database
const saveComment = async (classroom_id, sender, comment) => {
  try {
    await db.execute(
      "INSERT INTO classroom_comments (classroom_id, sender, comment) VALUES (?, ?, ?)",
      [classroom_id, sender, comment]
    );
    return { message: "Comment added successfully" }; // No Express response here
  } catch (error) {
    console.error("❌ Error saving comment:", error);
    throw new Error("Failed to save comment"); // Throw an error instead of res.json()
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
      "SELECT * FROM classroom_comments WHERE classroom_id = ? ORDER BY time DESC",
      [classroomId]
    );
    return comments;
  } catch (err) {
    console.error("Error fetching comments:", err);
    throw new Error("Failed to fetch comments");
  }
};

module.exports = { saveComment, getComments };
