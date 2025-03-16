import db from '../database/connection'

const saveComment = async (classroomId, sender, comment) => {
    try {
        await db.query(
            'INSERT INTO classroom_comments (classroom_id, sender, comment) VALUES (?, ?, ?)', 
            [classroomId, sender, comment]
        );
    } catch (err) {
        console.error('Error saving comment', err);
        throw new Error('Failed to save comment');
        
    }
}

const getComments = async (classroomId) => {
    try {
        const [rows] = await db.query(
            'SELECT sender, comment, time FROM classroom_comments WHERE classroom_id = ? ORDER BY time DESC',
            [classroomId]
        );
        return rows;
    } catch (err) {
        console.error('Error fetching comments', err);
        throw new Error('Failed to fetch comments');
    }
}

module.exports = {saveComment, getComments}