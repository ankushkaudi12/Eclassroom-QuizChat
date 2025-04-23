const express = require("express");
const { addAnnouncements, upload, getAnnouncements, deleteAnnouncement, updateAnnouncement } = require("../controllers/announcementsController");
const { addQuiz, getQuizzes, deleteQuiz, editQuiz } = require("../controllers/quizController");
const { addQuestions } = require("../controllers/questionsController");

const router = express.Router();

/* POST methods*/
router.post("/announcements/add", upload.single("file"), addAnnouncements);
router.post("/quiz/add", addQuiz);
router.post("/quiz/add/questions", addQuestions);

/* GET methods */
router.get("/announcements/:classroom_id", getAnnouncements);
router.get("/quiz/:course_id", getQuizzes);

/* DELETE methods */
router.delete("/announcements/delete/:id", deleteAnnouncement);
router.delete("/quiz/delete/:id", deleteQuiz);

/* PUT methods */
router.post("/announcements/update/:id", upload.single("file"), updateAnnouncement);
router.put("/quiz/update/:id", editQuiz);

module.exports = router;
