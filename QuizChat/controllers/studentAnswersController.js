const db = require('../database/connection'); // Adjust path to your db.js

const submitAnswersAndCalculateScoreForStudent = async (req, res) => {
    const { answers, quizId, name } = req.body;
    console.log(req.body);


    if (!quizId) {
        return res.status(400).json({ message: "quizId is required." });
    }

    if (!Array.isArray(answers) || answers.length === 0) {
        return res.status(400).json({ message: "Answers array is required and cannot be empty." });
    }

    const insertQuery = `
        INSERT INTO student_answers (student_id, question_id, selected_answer, name)
        VALUES (?, ?, ?, ?)
    `;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const studentId = answers[0].student_id;

        for (const answer of answers) {
            const { student_id, question_id, selected_answer } = answer;

            if (!student_id || !question_id || selected_answer == null) {
                throw new Error('Invalid answer data');
            }

            if (student_id !== studentId) {
                throw new Error('All answers must belong to the same student');
            }

            await connection.query(insertQuery, [
                student_id,
                question_id,
                selected_answer,
                name
            ]);
        }

        const scoreQuery = `
    INSERT INTO quiz_results (student_id, quiz_id, score, name)
    SELECT
        ? AS student_id,
        ? AS quiz_id,
        COUNT(*) AS score,
        ? AS name
    FROM student_answers sa
    JOIN questions q ON sa.question_id = q.id
    WHERE sa.selected_answer = q.correct_answer
      AND sa.student_id = ?
      AND q.quiz_id = ?
    ON DUPLICATE KEY UPDATE 
        score = VALUES(score),
        name = VALUES(name);
`;


        await connection.query(scoreQuery, [studentId, quizId, name, studentId, quizId]);


        await connection.commit();
        res.status(200).json({ message: 'Answers submitted and score calculated.' });

    } catch (error) {
        await connection.rollback();
        console.error('Error submitting answers or calculating score:', error);
        res.status(500).json({ message: 'Failed to process answers and calculate score.' });
    } finally {
        connection.release();
    }
};

module.exports = {
    submitAnswersAndCalculateScoreForStudent,
};
