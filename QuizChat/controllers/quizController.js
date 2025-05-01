// quizController.js
const db = require("../database/connection");

const addQuiz = async (req, res) => {
    const { name, description, course_id, start_time, end_time, timer } = req.body;
    try {
        const [result] = await db.execute(
            "INSERT INTO quizzes (name, description, course_id, start_time, end_time, timer) VALUES (?, ?, ?, ?, ?, ?)",
            [name, description, course_id, start_time, end_time, timer]
        );
        res.status(201).json({ message: "Quiz added", quiz_id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to save quiz" });
    }
};

const getQuizzes = async (req, res) => {
    try {
        const course_id = req.params.course_id;
        const [rows] = await db.execute("SELECT * FROM quizzes WHERE course_id = ?", [course_id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
};

const deleteQuiz = async (req, res) => {
    try {
        const quiz_id = req.params.id;
        await db.execute("DELETE FROM quizzes WHERE id = ?", [quiz_id]);
        res.status(200).json({ message: "Quiz deleted" });
    } catch (error) {
        res.status(500).json({ error: "Delete failed" });
    }
};

const editQuiz = async (req, res) => {
    const { name, description, start_time, end_time, timer } = req.body;
    const quiz_id = req.params.id;

    try {
        await db.execute(
            "UPDATE quizzes SET name = ?, description = ?, start_time = ?, end_time = ?, timer = ? WHERE id = ?",
            [name, description, start_time, end_time, timer, quiz_id]
        );
        res.status(200).json({ message: "Quiz updated" });
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
};

module.exports = { addQuiz, getQuizzes, deleteQuiz, editQuiz };
