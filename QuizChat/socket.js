const WebSocket = require('ws');
const { saveComment } = require('./controllers/commentControllers')

const handleSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('New web socket client connected');

        ws.on('message', async (data) => {
            const { claassroomId, sender, comment } = JSON.parse(data);

            try {
                await saveComment(claassroomId, sender, comment);

                const newComment = { claassroomId, sender, comment, time: new Date()};

                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(newComment));
                    }
                });
            } catch (err) {
                console.error("Error processing comment: ", err);
                ws.send(JSON.stringify({error: 'Failed to process comment'}));
            }
        });
        
        ws.on('close', () => console.log('Client disconnected'));
    });
};

module.exports = handleSocket;  // Export the function to be used elsewhere