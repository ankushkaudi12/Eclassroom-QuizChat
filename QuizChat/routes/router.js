const express = require("express");
const { addAnnouncements, getAnnouncements, deleteAnnouncement, updateAnnouncement } = require("../controllers/announcementsController");
const { addQuiz, getQuizzes, deleteQuiz, editQuiz } = require("../controllers/quizController");
const { addQuestions, getQuestions, deleteQuestion } = require("../controllers/questionsController");
const { addStudentAnswers } = require("../controllers/studentAnswersController");
const { calculateAndStoreScores, getQuizResults } = require("../controllers/quizResultsController");
const { addNotes, upload, getNotes, deleteNotes, updateNotes } = require("../controllers/notesController");

const router = express.Router();

/* POST methods*/
router.post("/announcements/add", addAnnouncements);
router.post("/notes/add", upload.single("file"), addNotes);
router.post("/quiz/add", addQuiz);
router.post("/quiz/add/questions", addQuestions);
router.post("/quiz/submission", addStudentAnswers)
router.post("/quiz/calculatescore", calculateAndStoreScores)

/* GET methods */
router.get("/announcements/:classroom_id", getAnnouncements);
router.get("/notes/:classroom_id", getNotes);
router.get("/quiz/:course_id", getQuizzes);
router.get("/quiz/questions/:quiz_id", getQuestions);
router.get("/quiz/results/:quiz_id", getQuizResults);


/* DELETE methods */
router.delete("/announcements/delete/:id", deleteAnnouncement);
router.delete("/notes/delete/:id", deleteNotes);
router.delete("/quiz/delete/:id", deleteQuiz);
router.delete("/quiz/questions/delete/:id", deleteQuestion);

/* PUT methods */
router.post("/announcements/update/:id", updateAnnouncement);
router.post("/notes/update/:id", upload.single("file"), updateNotes);
router.put("/quiz/update/:id", editQuiz);

module.exports = router;
