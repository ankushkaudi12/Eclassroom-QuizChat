const WebSocket = require("ws");
const {
  saveComment,
  getComments,
} = require("./controllers/commentControllers");

const handleSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("✅ New WebSocket client connected");

    ws.on("message", async (data) => {
      const message = JSON.parse(data);

      if (message.type === "join") {
        const { classroomId } = message;
        ws.classroomId = classroomId; // Store classroomId in WebSocket object
        console.log(`🔹 User joined classroom: ${classroomId}`);

        // Fetch past comments dynamically
        try {
          const pastComments = await getComments(classroomId);
          ws.send(JSON.stringify({ type: "pastComments", data: pastComments }));
        } catch (err) {
          console.error("❌ Error retrieving past comments:", err);
          ws.send(JSON.stringify({ error: "Failed to load past comments" }));
        }
      } else if (message.type === "newComment") {
        const { classroomId, sender, comment } = message;

        try {
          await saveComment(classroomId, sender, comment);

          const newComment = { classroomId, sender, comment, time: new Date() };

          // Send new comment to all clients in the same classroom
          wss.clients.forEach((client) => {
            if (
              client.readyState === WebSocket.OPEN &&
              client.classroomId === classroomId
            ) {
              client.send(
                JSON.stringify({ type: "newComment", data: newComment })
              );
            }
          });
        } catch (err) {
          console.error("❌ Error processing comment: ", err);
          ws.send(JSON.stringify({ error: "Failed to process comment" }));
        }
      }
    });

    ws.on("close", () => console.log("❌ Client disconnected"));
  });
};

module.exports = handleSocket;
