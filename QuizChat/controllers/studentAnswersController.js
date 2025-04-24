const pool = require('../database/connection'); // Adjust path to your db.js

const addStudentAnswers = async (req, res) => {
    console.log("==== Received Request ====");
    console.log("Raw body:", req.body);
    console.log("Type of req.body:", typeof req.body);
    const { answers } = req.body;
    console.log("Extracted answers:", answers);

    if (!Array.isArray(answers) || answers.length === 0) {
        return res.status(400).json({ message: "Answers array is required and cannot be empty." });
    }

    const insertQuery = `
        INSERT INTO student_answers (student_id, question_id, selected_answer)
        VALUES (?, ?, ?)
    `;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        for (const answer of answers) {
            const { student_id, question_id, selected_answer } = answer;

            await connection.query(insertQuery, [
                student_id,
                question_id,
                selected_answer,
            ]);
        }

        await connection.commit();
        res.status(201).json({ message: 'Answers submitted successfully' });
    } catch (error) {
        await connection.rollback();
        console.error('Error inserting answers:', error);
        res.status(500).json({ message: 'Failed to insert answers' });
    } finally {
        connection.release();
    }
};

module.exports = {
    addStudentAnswers,
};
