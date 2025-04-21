const express = require("express");
const { addAnnouncements, upload, getAnnouncements, deleteAnnouncement, updateAnnouncement } = require("../controllers/announcementsController");
const { addQuiz, getQuizzes } = require("../controllers/quizController");

const router = express.Router();

/* POST methods*/
router.post("/announcements/add", upload.single("file"), addAnnouncements);
router.post("/quiz/add", addQuiz);

/* GET methods */
router.get("/announcements/:classroom_id", getAnnouncements);
router.get("/quiz/:course_id", getQuizzes);

/* DELETE methods */
router.delete("/announcements/delete/:id", deleteAnnouncement);

/* PUT methods */
router.post("/announcements/update/:id", upload.single("file"), updateAnnouncement);

module.exports = router;
