const db = require('../database/connection');

const getQuizResultOfStudent = async (req, res) => {
    const { quiz_id, student_id } = req.params;

    try {
        const query = `
            SELECT * FROM quiz_results WHERE quiz_id = ? AND student_id = ?;
        `;

        const [result] = await db.execute(query, [quiz_id, student_id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'No results found for this student.' });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error fetching quiz result:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getQuizResults = async (req, res) => {
    const { quiz_id } = req.params;
    
    try {
        const query = `
            SELECT * FROM quiz_results WHERE quiz_id = ?;
        `;
    
        const [results] = await db.execute(query, [quiz_id]);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching quiz results:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getQuizResultOfStudent, getQuizResults };